import {
  getAPIDomain
} from '../../../utils/util'
import {
  GET,
  POST
} from '../../../utils/request'
import { SHARE_IMAGE_URL, SHARE_TITLE, SHARE_TO_FRIENDS_IMAGE_URL } from '../../../utils/constant'
const FPS = 24;
const App = getApp();
// 记录我的答题记录
let myRankingList = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timer: 0,
    myScore: 0,
    opponentScore: 0,
    questionIndex: 0, //默认第一题
    timeLimit: 10, //答题时间
    oppFinish: false, //对手答题状态 
    userFinishAns: false, //用户答题状态
    matchProgess: {
      loadingView: true,
      pkView: true,
      answerVeiw: true,
      answerTitleAni: true,
      answerConAni: false
    },
    resultFlag: false, //结果页标识
    pkReview:false,   //回顾页 标识
    showAnswerForDebug: true // 展示答案，用户辅助测试
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.soundEffectRight = wx.createInnerAudioContext();
    this.soundEffectRight.src = '/assets/correct_sound.mp3';
    this.soundEffectWrong = wx.createInnerAudioContext();
    this.soundEffectWrong.src = '/assets/wrong_sound.mp3';
    this.searchPlayer(options);
    // canvas初始化
    this.ctx = wx.createCanvasContext('countdown', this);
    this.ctxWidth = 76;
    this.ctxHeight = 76;
    // 隐藏分享按钮
    wx.hideShareMenu();

  },
  // 答题初始化
  initQuestion() {
    // 初始化答题音乐
    let currentQuestion = this.data.rankingList[this.data.questionIndex];
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
    this.innerAudioContext.loop = false;
    this.innerAudioContext.src = currentQuestion.audioUrl;
    
    // 答题类型，0:猜歌名 1:猜歌手
    let {
      type: questionType
    } = this.data.rankingList[this.data.questionIndex];

    this.setData({
      questionType
    })

    this.setCountdown();
    //  展示对手选择
    this.showOpponentAns();
  },
  // 绘制圆形进度条
  drawCircleProgress: function(frames) {
    let ctx = this.ctx;
    let circleCenter = {
      x: this.ctxWidth / 2,
      y: this.ctxHeight / 2,
    }
    let totalFrames = this.data.timeLimit * FPS;
    let ratio = frames / totalFrames;
    let percentage = Math.floor(ratio * 10000) / 10000;
    // 绘制外围圈
    ctx.setLineWidth(1);
    ctx.setStrokeStyle('#000');
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, 37, 0, 2 * Math.PI);
    ctx.stroke();
    // 绘制内圈
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, 19, 0, 2 * Math.PI);
    ctx.stroke();
    // 绘制中间白色部分
    ctx.setLineWidth(16);
    ctx.setStrokeStyle('#fff');
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, 28, 0, 2 * Math.PI);
    ctx.stroke();

    if (percentage == 0) {
      let end = 3 / 2 * Math.PI;
      ctx.setLineWidth(8);
      ctx.setStrokeStyle('#FFCC00');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(circleCenter.x, circleCenter.y, 28, -1 / 2 * Math.PI, end, true);
      ctx.stroke();
    } else if (percentage < 1) {
      let end = percentage * 2 * Math.PI - 1 / 2 * Math.PI;
      ctx.setLineWidth(8);
      ctx.setStrokeStyle('#FFCC00');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(circleCenter.x, circleCenter.y, 28, -1 / 2 * Math.PI, end, true);
      ctx.stroke();
    }

    ctx.draw();
  },
  // 倒计时
  setCountdown() {
    clearInterval(this.countdownTimerId);
    clearInterval(this.drawTimerId);
    let timeLimit = this.data.timeLimit;
    let diff = timeLimit * 10;

    let frames = 0;
    let timeGap = Math.floor(1000 / FPS);
    this.drawTimerId = setInterval(() => {
      frames++;
      this.drawCircleProgress(frames);
      if (frames > this.timeLimit * FPS) {
        clearInterval(this.drawTimerId);
      }
    }, timeGap)

    this.countdownTimerId = setInterval(() => {
      if (diff <= 0) {
        this.timeoutHandler();
      } else {
        diff -= 1;
        this.levelTimeConsumed = timeLimit * 10 - diff;
        let timerStr = Math.ceil((diff / 10)).toString() ;
        // 精确时间
        let exactTime = (diff / 10).toString();
        let exactTimer = exactTime.split('');
        let timer = timerStr.split('');
        this.setData({
          timer,
          exactTimer
        })
       
      }
    }, 100)
  },
  // 超时处理
  timeoutHandler() {
    clearInterval(this.countdownTimerId);
    clearInterval(this.drawTimerId);

    if (!this.data.userFinishAns) {
      // 默认用户 未选答案
      this.beginAnswer();
    }
  },
  // 回答错误回调
  answerWrongHandler() {
    // this.innerAudioContext.stop();
    this.soundEffectWrong.play();
  },
  // 回答正确回调
  answerRightHandler() {
    // this.innerAudioContext.stop();
    this.soundEffectRight.play();   
  },

  // 答题动画
  answerAniFn() {

    let timerStr = `${this.data.timeLimit}`;
    let timer = timerStr.split('');
    
    this.setData({
      timer
    })
    this.drawCircleProgress(0);
    
    setTimeout(() => {
      this.setData({
        'matchProgess.answerTitleAni': false
      }, () => {
        setTimeout(()=>{
          this.setData({
            'matchProgess.answerConAni': true
          })
        },500)
        // 初始化答题
        this.initQuestion(); 

      })
    }, 2000)
  },
  // 匹配玩家
  searchPlayer(options) {
    let {
      checkpointId,
      costCoin
    } = options;
    // 开启匹配动画
    this.setData({
      "matchProgess.loadingView": false
    })
    //  获取对战信息
    GET('ranking/checkpoint/loading', {
      checkpointId
    }).then(res => {
      // 扣除金币
      console.log('获取对战信息',res)
      let {
        currentUser,
        rankingData: {
          checkpointId,
          rankingId,
          rankingList,
          seasonId,
          rewardCoinNum,
          limit
        },
        rankingUser
      } = res;
  
      this.setData({
        currentUser,
        checkpointId,
        seasonId,
        rankingId,
        rankingList,
        rankingUser,
        costCoin,
        rewardCoinNum,
        limit
      });
      // 设置loading时长 3s - 5s; 
      let randomLoading = (Math.ceil(Math.random() * 3) + 2)*1000;
    
      setTimeout(() => {
        // 关闭匹配动画，开启ok 界面
        this.setData({
          "matchProgess.loadingView": true,
          "matchProgess.pkView": false,
        })
        // 扣除猜歌币
        this.deductCoin(checkpointId);
        // 关闭匹配，pk界面，打开答题界面

        setTimeout(() => {
          this.setData({
            "matchProgess.loadingView": true,
            "matchProgess.pkView": true,
            "matchProgess.answerVeiw": false, 
          })
          this.answerAniFn();
        }, 2500)

      }, randomLoading);
    })
   
  },
  // 扣除猜歌币
  deductCoin(checkpointId) {
    GET("ranking/checkpoint/cost-coin", {
      checkpointId
    }).then(res => {
      console.log("扣除猜歌币", res)
    })
  },
  // 开始答题
  beginAnswer(e) {
    this.setData({
      // "matchProgess.answerTitleAni":false,
      ansBtnDisabled: true,
      userFinishAns: true,
    })
    // 用户选择的答案
    let userSelAnswer;
    // 用户选择的题目index
    let userSelIndex;
    if (!e) {
      // 用户没有点击 直接设置 答案为空 
      userSelAnswer = "";
      userSelIndex = -1;
    } else {
      userSelAnswer = e.currentTarget.dataset.answer;
      userSelIndex = e.currentTarget.dataset.index;
    }

    //  正确答案
    let correctAnswer = this.data.rankingList[this.data.questionIndex].ansOk;

    // 剩余时间
    let remainTime = Number(this.data.exactTimer.join(""));
    // 我的答题时间
    let myAnsTime = (10 - remainTime).toFixed(1);
    // 我当前得分
    let myCurrentScore = 0;
    // 记录用户答题状态  -1答题错误； 1答题正确； 0未作答
    let userAnsStatus;


    // 答对 0
    if (userSelAnswer == correctAnswer) {
      userAnsStatus = 1;
      // 用户当前题 得分
      myCurrentScore = (200 - (2 * myAnsTime) / 0.1).toFixed(0);
      // 我的总分
      let myTotalScore;
      // 判断最后一题
      let lastQuiz = this.data.rankingList.length-1;
      if (this.data.questionIndex == lastQuiz){
        myTotalScore = Number(this.data.myScore) + Number(myCurrentScore)*2;
      }else{
        myTotalScore = Number(this.data.myScore) + Number(myCurrentScore);
      }
      // 所有题目总分
      let allQuizScore = (this.data.limit + 1) * 200;
      // 我的进度条百分比
      let myPercent = (myTotalScore / allQuizScore) * 100;
      this.setData({
        userAnsType: 0,
        userSelIndex,
        myScore: myTotalScore,
        myPercent,
        userSelAnswer,
        myAnsTime,
        userAnsStatus,
        myCurrentScore
      })
      this.answerRightHandler();
  
    }
    // 答错 1
    if (userSelAnswer && userSelAnswer != correctAnswer) {
      userAnsStatus = -1;
      myCurrentScore = 0;
      // 我的总分
      let myTotalScore = Number(this.data.myScore);
      this.setData({
        userAnsType: 1,
        userSelIndex,
        userSelAnswer,
        myScore: myTotalScore,
        myAnsTime,
        userAnsStatus,
        myCurrentScore
      });
      this.answerWrongHandler();
    
    }
    // 未答 2
    if (userSelAnswer == "" || userSelAnswer == null) {
      userAnsStatus = 0;
      myCurrentScore = 0
      // 我的总分
      let myTotalScore = Number(this.data.myScore);
      this.setData({
        userAnsType: 2,
        userSelIndex,
        userSelAnswer,
        myScore: myTotalScore,
        myAnsTime,
        userAnsStatus,
        myCurrentScore
      });
      this.answerWrongHandler();
   
    }
    // 完成答题
    this.questionFinish();


    // 当前对局的输赢状态 1 胜利 -1失败 0 平局
    // let currentResultStatus ;
    // let currentOppScore = this.data.rankingList[this.data.questionIndex].score;
    // if (myCurrentScore > currentOppScore){
    //   currentResultStatus=1;
    // }
    // if (myCurrentScore < currentOppScore) {
    //   currentResultStatus = -1;
    // }
    // if (myCurrentScore == currentOppScore) {
    //   currentResultStatus = 0;
    // }

  },
  // 判断当前题目回答完成
  questionFinish() {
  
    if (this.data.userFinishAns && this.data.oppFinish) {
      this.innerAudioContext.stop();

      clearInterval(this.countdownTimerId);
      clearInterval(this.drawTimerId);

      // 总题数
      let totalQuetionLen = this.data.limit - 1;
      // 当前题目索引
      let currentIndex = this.data.questionIndex;

      // 用户是否答对，如果答错 展示正确答案
      if (this.data.userAnsStatus!=1){
        setTimeout(()=>{
          this.showCorrectAns();
        },2000)
         
      }
      

      // 判断是否开启下一题
      if (currentIndex < totalQuetionLen) {
        console.log(213123)
        let newQuestionIndex = currentIndex + 1;
        this.setData({
          questionIndex: newQuestionIndex,
          ansBtnDisabled: false,
          userFinishAns: false,
          oppFinish: false,
          userAnsType: null,
          userSelIndex: null,
          oppAnsType: null,
          oppAnsIndex: null,
          correctAnsIndex: null,
          'matchProgess.answerTitleAni': true,
          'matchProgess.answerConAni': false
        })
        // 加载新一题
        this.nextQuestion();


      } else {
        // 展示结果页
        this.showResult();
      }
     
    // 保留本题 用户选择的信息

      let rankingUnit = {
        quizId: this.data.rankingList[this.data.questionIndex].quizId,
        userId: this.data.currentUser.id,
        type: this.data.rankingList[this.data.questionIndex].type,
        songId: this.data.rankingList[this.data.questionIndex].songId,
        audioUrl: this.data.rankingList[this.data.questionIndex].audioUrl,
        status: this.data.userAnsStatus,
        ansOk: this.data.rankingList[this.data.questionIndex].ansOk,
        ans: this.data.userSelAnswer,
        ansList: this.data.rankingList[this.data.questionIndex].ansList,
        time: this.data.myAnsTime,
        score: this.data.myCurrentScore,
        songInfo: this.data.rankingList[this.data.questionIndex].songInfo
      }
      myRankingList.push(rankingUnit)

      this.setData({
        myRankingList
      })

    }
  },
  // 下一题
  nextQuestion() {
    this.answerAniFn() ;
  },

  // 展示正确答案
  showCorrectAns() {
    let ansList = this.data.rankingList[this.data.questionIndex].ansList;
    let correctKey = this.data.rankingList[this.data.questionIndex].ansOk;
    // 获取正确答案的索引
    let index = ansList.indexOf(correctKey);
    this.setData({
      correctAnsIndex: index
    })
  },
  // 展示对手选择
  showOpponentAns() {
    // 对手作答时间
    let oppAnsTime = this.data.rankingList[this.data.questionIndex].time * 1000;
  
    setTimeout(() => {

      let ansList = this.data.rankingList[this.data.questionIndex].ansList;
      //  正确答案
      let correctAnswer = this.data.rankingList[this.data.questionIndex].ansOk;
      // 对手答案
      let oppAns = this.data.rankingList[this.data.questionIndex].ans;
      // 对手答题 索引
      let oppAnsIndex = ansList.indexOf(oppAns);
      // 最后一题
      let lastQuiz = this.data.rankingList.length - 1;
        // 对手当前题 得分
      let oppScore;
      if (this.data.questionIndex == lastQuiz){
        // 最后一题得分翻倍
        oppScore = this.data.rankingList[this.data.questionIndex].score*2
      }else{
        oppScore = this.data.rankingList[this.data.questionIndex].score
      }
      // 对手总分
      let oppTotalScore = this.data.opponentScore + oppScore;
      let allQuizScore = (this.data.limit+1)*200;
      // 对手进度条百分比
      let oppPercent = (oppTotalScore / allQuizScore) * 100;
      // 设置对手的分数 与当前的进度条
      this.setData({
        opponentScore: oppTotalScore,
        oppPercent,
        oppFinish: true
      })
      // 答对 0
      if (oppAns == correctAnswer) {
        this.setData({
          oppAnsType: 0,
          oppAnsIndex
        })
        this.questionFinish()
      }
      // 答错 1
      if (oppAns && oppAns != correctAnswer) {
        this.setData({
          oppAnsType: 1,
          oppAnsIndex
        })
        this.questionFinish()
      }
      // 未答 2
      if (oppAns == "" || oppAns == null) {
        this.setData({
          oppAnsType: 2,
          oppAnsIndex
        })
        this.questionFinish()
      }
 

    
       
    }, oppAnsTime)

  },
  // 保存用户选择
  saveUserData() {
    // 对战结果
    let result;
    if (this.data.myScore > this.data.opponentScore) {
      // 胜利
      result = 1;
      this.setData({
        pkResult:1
      })
      this.winBgm();
    }
    if (this.data.myScore < this.data.opponentScore) {
      // 失败
      result = -1;
      this.setData({
        pkResult: -1
      })
    }
    if (this.data.myScore == this.data.opponentScore) {
      // 平局
      result = 0;
      this.setData({
        pkResult: 0
      })
    }
    
    POST("ranking/checkpoint/save-result", {
      rankingUserId: this.data.rankingUser[0].id,
      seasonId: this.data.seasonId,
      checkpointId: this.data.checkpointId,
      result: result,
      currentUserScore: this.data.myScore,
      rankingUserScore: this.data.opponentScore,
      rankingId: this.data.rankingId,
      rankingList: this.data.myRankingList,
    }).then((res) => {
      wx.hideLoading();
    })
    
    this.setData({
      myRankingList: this.data.myRankingList
    })

  },
  // 展示结果页
  showResult() {
    clearInterval(this.countdownTimerId);
    clearInterval(this.drawTimerId);
    this.innerAudioContext.stop();
   setTimeout(()=>{
     // 开启结果页展示
     this.setData({
       resultFlag: true
     }, () => {
       wx.showLoading({
         title: '加载中...',
       })
       this.saveUserData();
     })

   },1200)

   
    
  },
  // 继续挑战
  keepPlay(){
    wx.navigateBack();
  },
  // 本局回顾
  pkReview(){
    this.setData({
      pkReview: true,   //回顾页 标识
      resultFlag:false,
      "matchProgess.loadingView": true,
      "matchProgess.pkView": true,
      "matchProgess.answerVeiw": true
    })
    if (this.winBgmAudio){
      this.winBgmAudio.stop();
    }
    
  },
  // 返回结果页
  backReview(){
    this.setData({
      pkReview: false,   //回顾页 标识
      resultFlag: true,
      "matchProgess.loadingView": true,
      "matchProgess.pkView": true,
      "matchProgess.answerVeiw": true
    })
    if (this.reviewMusic){
      this.reviewMusic.stop();
    }
    
  },
  // 点击播放回顾列表音乐
  playReviewMusic(e){
    this.setData({
      currentMusic: e.currentTarget.dataset.audiourl,
      playReviewMusicIndex: e.currentTarget.dataset.btnindex,
      isMusicPlaying: true
    });
    let isPaused;
    if (!this.reviewMusic) {
      this.reviewMusic = wx.createInnerAudioContext();
      this.reviewMusic.src = e.currentTarget.dataset.audiourl;
      this.reviewMusic.loop=true;
    }else{
      isPaused = this.reviewMusic.paused;
      this.reviewMusic.src = e.currentTarget.dataset.audiourl;
    }

    if (isPaused) {
      this.setData({
        isMusicPlaying: true,
      })
      this.reviewMusic.play();
    } else {
      this.setData({
        isMusicPlaying: false,
      })
      this.reviewMusic.pause();
    }
  },
  // 用户中途退赛
  escape(){
    wx.showModal({
      title:"温馨提示",
      showCancel:false,
      content:'因你上局比赛退出，对局结果为失败'
    });
    wx.showLoading({
      title: '加载中...',
    })
    // 保存答题记录
    POST("ranking/checkpoint/save-result", {
      rankingUserId: this.data.rankingUser[0].id,
      seasonId: this.data.seasonId,
      checkpointId: this.data.checkpointId,
      result: -1,
      currentUserScore: this.data.myScore,
      rankingUserScore: this.data.opponentScore,
      rankingId: this.data.rankingId,
      rankingList: this.data.myRankingList,
    }).then(res=>{
      wx.hideLoading();
    })
  },
  // 卸载页面 清除页面变量配置
  unloadClear(){
    // 清除定时器 
    clearInterval(this.countdownTimerId);
    clearInterval(this.drawTimerId);
    // 清除答题音乐
    if (this.innerAudioContext){
      this.innerAudioContext.stop();
    }
     // 清除胜利背景音乐
    if (this.winBgmAudio){
      this.winBgmAudio.stop();
    }
    // 清除本局回顾背景音乐

    if (this.reviewMusic) {
      this.reviewMusic.stop();
    }

    // 清空我的记录
   myRankingList=[];
   
  },
  // 胜利背景音乐
  winBgm(){
    this.winBgmAudio = wx.createInnerAudioContext();
    //  歌曲总数
    let songTotalNum = Number(this.data.limit) ;
    // 生成一首随机数
    let randomNum = parseInt(Math.random() * songTotalNum);
    let randomMusic = this.data.rankingList[randomNum].audioUrl;
    this.winBgmAudio.src = randomMusic;
    this.winBgmAudio.autoplay = true;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let songTotal = this.data.limit -1;
    // 中途退赛处理
    if (this.data.questionIndex <= songTotal && !this.data.resultFlag && !this.data.pkReview) {
      this.escape();
      this.unloadClear();
    }else{
      this.unloadClear();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let songTotal = this.data.limit - 1;
    // 中途退赛处理 当前答题数小于等于 歌曲总数  并且 不是在结果页，并且，不是在pk回顾页
    if (this.data.questionIndex <= songTotal && !this.data.resultFlag && !this.data.pkReview) {
      this.escape();
      this.unloadClear();
    }else{
      this.unloadClear();
    }
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  onShareAppMessage: function (res) {
    let shareUrl = `/pages/index/index`,
      shareTitle ='我的纪录在此，谁敢来比，输了发红包！';
    if (res.from == 'button') {
      this.setData({
        tipShow: true,
        discover: true
      })

      let shareTime = Date.parse(new Date()),
        share_user_id = App.loginUtil.currentUser().id,
        pagePath = `/pages/index/index`;

      shareUrl += `?timestamp=${shareTime}&share_user_id=${share_user_id}&page=${pagePath}&isFromShare=1`;

    }
    return {
      title: shareTitle,
      path: shareUrl,
    }
  }
})