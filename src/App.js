import { func } from "prop-types";
import "./App.css";
import Editor from "./Editor";
import React, { PureComponent, createRef } from "react";
const DialogContent = [
  //以下为对话框内容显示顺序
  //所有属性有严格大小写要求
  //以下所有属性在不需要时都可不定义，但建议定义id便于查找
  //此项目所有资源文件位于public/res中
  //以下为对各属性的解释：
  //文字属性：text:字符型，为角色对话台词
  //          name：字符型，为角色名字
  //          fontBold：布尔型，值为true时将文字加大加粗
  //角色图片修改：pic：字符型，值为角色图片地址
  //              changePic:布尔型，值为true则切换图片
  //背景图片修改：changeSence：布尔型，需要变背景时请将其设置为true,否则为false（也可不定义）
  //              scence：字符型，值为背景图片地址
  //音频属性：changeBgm：布尔型，值为true代表bgm需要改变
  //          changeNpcAudio：同changeBgm
  //          Bgm：字符型，值为背景音乐路径
  //          NpcAudio: 字符型，值为角色语音音频路径
  //         不需要音频资源时请设置为ProjectRes/BGM/Silence.wav
  //选项切换：choice:布尔型，值为true显示选项背景
  //是否设置问题：problemSet:布尔型，值为true时表示需要右边回答正确才可继续
  //对话框是否显示:DialogShow:布尔型，值为true显示,false不显示,若不定义该属性则默认显示
  //视频播放:video:布尔型，值为true时播放
  //         NavChange：布尔型，改变背景时将上下页脚改变
  //         videoAdress:，布尔型，值为视频地址

  {
    text: "logo",
    video: true,
    videoAdress: "ProjectRes/Animation/logo.mp4",
  },
  {
    text: "",
    video: true,
    videoAdress: "ProjectRes/Animation/Cover.mp4",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/00Title.wav",
    NavChange: true,
    changeScence: true,
    scence: "ProjectRes/BG/Office_night_1.png",
  },
  {
    text: "",
    video: true,
    videoAdress: "ProjectRes/Animation/Poem.mp4",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/01June Song.wav",
  },
  {
    text: "假如可以用各种颜色形容事件的一切事物",
    NavChange: true,
    changeScence: true,
    scence: "ProjectRes/BG/Office_night_1.png",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/02KeyBoard.wav",
  },
  {
    text: "那么我的生活,更像是灰白色。\n单调纯一,如天鹅湖般的平静,毫无波澜。",
  },
  {
    text: "从小学到工作之年，几乎所有的测试乃至考验\n我都能出奇而又平常地,以“恰好”的姿态通过。",
  },
  { text: "没有任何不甘，恰恰相反。我将其视作一种能力，并由此感到庆幸。\n" },
  { text: "但是……" },
  {
    text: "啪！！！",
    changeNpcAudio: true,
    NpcAudio: "ProjectRes/Voice/nock_0.wav",
  },
  {
    text: "“想什么呢，看你发了一会儿呆了。不会是在想哪个姑娘吧”",
    name: "同事A",
    changeNpcAudio: true,
    NpcAudio: "ProjectRes/Voice/npc_1.wav",
  },
  {
    text: "“你啊就别拿明煜开玩笑了，你看咱们这每天工作这么长时间，回家恨不得赶紧躺下，哪有什么时间谈情说爱啊”",
    name: "同事B",
    changeNpcAudio: true,
    NpcAudio: "ProjectRes/Voice/npc_2.wav",
  },
  { text: "本来不知如何回答的，没想到居然有人解围,\n果然又是我的“能力”吧" },
  { text: "“没错没错，还是赶紧写完代码赶紧下班吧”", name: "我" },
  { text: "我转头看向黑色的屏幕，上面是尚未写完的C#代码" }, //代码内容，在这显示代码,
  {
    text: "第一行叫using System的是引用的命名空间，下面则是命名空间下的主类和控制台入口方法。",
  },
  {
    text: '里面有个“Console.WriteLine("");”，如果我没记错的话,\nConsole代之的是控制台，WriteLine则是其下的一个方法',
  },
  {
    text: "在“WriteLine()”的括号里填上想要输出的内容，应该就能实现控制台的输出",
  },
  {
    text: '貌似很简单，我只需要在其中填入"Thank you for your playing."\n就可以完成今天的工作了',
    problemSet: true,
  }, //若错误，则显示'貌似不是这句，而是'Thank you for your playing.'，我决定再次尝试
  {
    text: "后来他们好像还聊了几句，但我没太在意,\n其实他们说的没错",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/03After School.wav",
  },
  {
    text: "我原本以为我只是一个很普通的成年人,\n至少在两周前是这样,但那以后似乎有些改变了",
  },
  { text: "没错" },
  { text: "我居然有了女朋友" },
  { text: "而且还是个温柔可爱的女孩子" },
  { text: "尽管我们的相遇甚至称得上魔幻" },
  { text: "尽管心中仍有一些疑惑" },
  { text: "但我肯定，自己不是在做梦" },
  { text: "因为人是不可能幻想出自己从未见过的人或事物的" },
  { text: "事实确实如此" },
  { text: "所以，\n我永远记得那天的情形" },
  {
    text: " ",
    // DialogShow: false,
    // changeScence: true,
    // scence: "",
    changeBgm: true,
    Bgm: "",
    video: true,
    videoAdress: "ProjectRes/Animation/Part1.mp4",
  }, //序章画面
  {
    text: "明明不远处还是灯火通明",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/05Linai.wav",
    DialogShow: true,
    NavChange: true,
    changeScence: true,
    scence: "ProjectRes/BG/Street_night_1.png",
  }, //此处需要BGM
  { text: "这里永远那样死寂，冻如冰石" },
  { text: "孤独裹挟这一带,却又是我的必经之路" },
  { text: "“还是赶紧回家洗漱睡觉吧”", name: "我" },
  { text: "至少在寒意占据我的身体前，我必须加快脚步了" },
  {
    text: "(不知名声音)",
    NpcAudio: "ProjectRes/Voice/shasha_0.wav",
    changeNpcAudio: true,
  }, //纸片摩擦声？
  //todo
  { text: "也许是流浪猫，毕竟这里小动物还是挺多的" },
  {
    text: "我就曾在此捡到过一只非品种猫，也许它不是那么可爱\n但是却为我那常驻人口为一的房间增添了不少乐趣",
  },
  { text: "可惜的是，一个月后，它永远离开了我" },
  { text: "随着我的思绪逐渐飞远" },
  { text: "不和谐的声音却越发清晰了，这提醒了我" },
  { text: "更像是人会发出的声音，而且可能不止一个" },
  { text: "至少在我的理解里，这条小巷的这个时间段是极少有人的踪迹的" },
  { text: "毕竟就在前面没多远就是繁华地带，人总是更加向往灯红酒绿" },
  { text: "没有人会向往孤独与冷清，即使再怎么否认" },
  { text: "那么，有一种不太妙的可能" },
  {
    text: "直觉与好奇心告诉我无论如何都要……",
    changeNpcAudio: true,
    NpcAudio: "ProjectRes/Voice/footPace_3.wav",
  },
  {
    text: "我决定....",
    choice: true,
  },
  {
    text: "啪！！！",
    changeScence: true,
    NavChange: true,
    Bgm: "",
    changeBgm: true,
    scence: "ProjectRes/CG/CG02_1.png",
    changeNpcAudio: true,
    NpcAudio: "ProjectRes/Voice/Pa.wav",
  }, //？啪的声音？
  // todo
  {
    text: "“非常抱歉，我没注意……，诶诶诶？”",
    name: "我",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/06FirstMeet.wav",
  },
  { text: "我有些惊慌失措，这是我的处世手册中所未曾记录的情况" },
  { text: "“姑娘，你先别哭啊，我我我……不……”", name: "我" },
  {
    text: "“我……”",
    name: "我",
    changeScence: true,
    scence: "ProjectRes/CG/CG02_2.png",
  },
  { text: "“等等，你怎么了”", name: "我" },
  { text: "拐角处突然出现的两名看起来不太和谐的社会人士引起了我的警觉" },
  { text: "按理来说，我和眼前的女孩子只是轻轻的一撞" },
  { text: "不至于让一个正常的女孩子露出这样的表情" },
  { text: "但她的红色的瞳孔中,\n我察觉到的，分明是委屈与哀求" },
  { text: "就像，就像刚刚从池塘里游入海洋的鱼马上又会被人打捞上岸" },
  { text: "不同的是，她恰好遇到了我" },
  { text: "她也许经历了什么，或者说正经历着什么" },
  { text: "这说不定是一个机会,\n我得做点什么，至少不能像现在这样干站着" },
  {
    text: "头脑风暴迅速综合着当前的情况,我很快得出了方案。\n事实上我根本没有时间去想太多",
  },
  { text: "“怎么在这里，我找了你半天了！”", name: "我" },
  { text: "这次我特意提高了声音，确保旁人可以听到，" },
  { text: "余光小心观察着拐角处的两人" },
  { text: "如我所愿，他们慢了下来，\n见他们观望的样子，我决定率先出击" },
  {
    text: "“走累了吧，要不我背着你，我们一起回家”",
    name: "我",
    changeScence: true,
    scence: "ProjectRes/CG/CG02_4.png",
  },
  { text: "我转身，趁机撇了一眼拐角处的两个人" },
  { text: "他们倒是彻底停了下来，看来是放弃了,\n脸上的表情我倒是没有看清" },
  {
    text: "不过我也不奢望我这拙劣的演技能够骗过他们,他们应该也只是碍于我而不敢明目张胆",
  },
  {
    text: "这让我我松了一口气，我本以为他们会来纠缠一番，这样事情就会变得麻烦",
  },
  { text: "但是他们似乎比我想象的要胆小\n不过也好，倒是给了我们离开的机会" },
  { text: "上来吧，我带你离开", name: "我" },
  {
    text: "…………",
    name: "？？？",
    changeScence: true,
    scence: "ProjectRes/CG/CG02_6.png",
  },
  {
    text: "“好”",
    name: "？？？",
    changeScence: true,
    scence: "ProjectRes/CG/CG02_7.png",
    NpcAudio: "ProjectRes/Voice/Cinderella_0.wav",
    changeNpcAudio: true,
  },
  { text: "“诶？”", name: "我" },
  {
    text: "好像哪里不太对",
    changeScence: true,
    changeBgm: true,
    Bgm: "",
    scence: "ProjectRes/CG/CG00_1.png",
    NavChange: true,
  }, //
  { text: "我明明只是装装样子，最终却……" },
  { text: "变成这个样子？" },
  {
    text: " ",
    DialogShow: false,
    changeScence: true,
    NavChange: true,
    scence: "ProjectRes/CG/CG03_2.png",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/04Snow Falls_2.wav",
  },
  { text: "…………", DialogShow: true },
  { text: "…………" },
  { text: "“我很抱歉，没有提前说明就擅自做决定了”", name: "我" },
  { text: "“如果让您感到不适，请务必提醒我！”", name: "我" },
  {
    text: "也许是因为太过紧张，我竟然对她说出了敬词，\n这就等于是把“我好紧张”，“我在故作镇定”写在脸上了吧",
  },
  { text: "但这其实无可厚非，这还是我第一次和女孩子有那么近距离的接触" },
  { text: "近到我能感受到她的体温，\n近到她每一簇呼吸我都能够听到" },
  { text: "明明是陌生人，我却能感受到\n我的心砰砰正跳个不停" },
  {
    text: "而她却显得那么平静，甚至，还有点开心？\n难道其实她根本没有意识到我们性别的差异，只是单纯的觉得我可以信任？",
  },
  {
    text: "“噗”",
    name: "？？？",
    changeScence: true,
    scence: "ProjectRes/CG/CG03_3.png",
    NpcAudio: "ProjectRes/Voice/Cinderella_1.wav",
    changeNpcAudio: true,
  },
  {
    text: "“并没有哦，你可以放轻松的，其实应该道歉\n的人是我吧，因为我的原因给你添麻烦了”",
    name: "？？？",
    changeScence: true,
    scence: "ProjectRes/CG/CG03_4.png",
    NpcAudio: "ProjectRes/Voice/Cinderella_2.wav",
    changeNpcAudio: true,
  },
  {
    text: "“我知道了，不过虽然不知道该不该问，只是这么晚了\n你怎么会一个人在这种地方”",
    name: "我",
  },
  {
    text: "“您也是一样呢”",
    name: "？？？",
    changeScence: true,
    scence: "ProjectRes/CG/CG03_3.png",
    NpcAudio: "ProjectRes/Voice/Cinderella_3.wav",
    changeNpcAudio: true,
  },
  { text: "“那倒也是，哈哈”", name: "我" },
  {
    text: "“哈，其实也不是什么不能说的，相信你也注意到刚才那两个人了吧”",
    name: "？？？",
    NpcAudio: "ProjectRes/Voice/Cinderella_4.wav",
    changeNpcAudio: true,
  },
  { text: "“是的，不过我也确实有些在意那两个人”", name: "我" },
  {
    text: "“他们是我的家人，我的父亲和叔叔”",
    name: "？？？",
    NpcAudio: "ProjectRes/Voice/Cinderella_5.wav",
    changeNpcAudio: true,
  },
  { text: "“什么？我还以为……”", name: "我" },
  {
    text: "“没错，其实我是离家出走的，大约在两个月前，\n我悄悄离开了我的家人，之后的时间里我一个人在这里租了一间房子，靠着店员的工作维持着清净的生活”",
    name: "？？？",
    changeScence: true,
    scence: "ProjectRes/CG/CG03_8.png",
    NpcAudio: "ProjectRes/Voice/Cinderella_6.wav",
    changeNpcAudio: true,
  },
  {
    text: "“但很快我的家人就找到了我，说着要带我回家，可是我不想回去\n所以我跑了出来，然后就遇到了你”",
    name: "？？？",
    NpcAudio: "ProjectRes/Voice/Cinderella_7.wav",
    changeNpcAudio: true,
  },
  {
    text: "“不过我现在算是无家可归了”",
    name: "？？？",
    NpcAudio: "ProjectRes/Voice/Cinderella_8.wav",
    changeNpcAudio: true,
  },
  {
    text: "“一直以来都是孑然一身，所以说实话\n当你说出会带我离开的时候，我甚至还有些庆幸呢”",
    name: "？？？",
    NpcAudio: "ProjectRes/Voice/Cinderella_9.wav",
    changeNpcAudio: true,
  },
  {
    text: "“对了，我还不知道你的名字呢”",
    name: "？？？",
    NpcAudio: "ProjectRes/Voice/Cinderella_10.wav",
    changeNpcAudio: true,
  },
  {
    text: "“日月明，单名一个煜”",
    name: "我",
    changeScence: true,
    scence: "ProjectRes/CG/CG03_5.png",
  },
  {
    text: "“是个比太阳更闪耀的名字呢，那么作为回应……”",
    name: "？？？",
    NpcAudio: "ProjectRes/Voice/Cinderella_11.wav",
    changeNpcAudio: true,
  },
  {
    text: "“我的名字是顾星晚，请多多指教”",
    name: "顾星晚",
    changeScence: true,
    scence: "ProjectRes/CG/CG03_4.png",
    NpcAudio: "ProjectRes/Voice/Cinderella_12.wav",
    changeNpcAudio: true,
  },
  { text: "疏星晚，起鱼笛，很耐听的名字，就如她本人一般" },
  {
    text: "“所以先生，即使仍有私心，你会愿意带一个流浪少女回家吗”",
    name: "顾星晚",
    NpcAudio: "ProjectRes/Voice/Cinderella_13.wav",
    changeNpcAudio: true,
  },
  { text: "“诶？”", name: "我" },
  {
    text: "那时候，我也不知道的决定会造成什么样的后果，但是站在我的角度，其实根本没有理由拒绝吧",
  },
  {
    text: "",
    video: true,
    videoAdress: "ProjectRes/Animation/Genshin.mp4",
    changeBgm: true,
    Bgm: "ProjectRes/BGM/Silence.wav",
  },
];

const SelectContent = [
  //
  { choice: ["去一探究竟", "......."] },
  { choice: ["A:原神启动", "B:妈妈生的"] },
];
const WrongText = [
  { text: '貌似不是这句，而是"Thank you for your playing."，我决定再次尝试' },
];

const gameState = {
  //游戏运行各项配置
  PlayState: false, //是否开始游戏
  textId: 0, //对话序号
  choiceId: 0, //玩家选择序号
  WrongTextId: 0,
};
class Scence extends React.Component {
  //主场景组件
  style = {
    backgroundImage: this.props.ChangePicId.SencePicAdress,
  };
  render() {
    let hide = null;
    if (this.props.ChangePicId.PicAdress === "") {
      hide = " hide";
    } else {
      hide = "";
    }

    return (
      <div
        className="SenceStyle"
        style={{
          backgroundImage: "url(" + this.props.ChangePicId.NavPic + ")",
        }}
      >
        <div className="MainSenceStyle">
          <div className="Nav">
            <div className="glass-container" id="glass"></div>
          </div>
          <img
            src={this.props.ChangePicId.ScencePicAdress}
            alt="待定"
            className={"ImgStyle"}
          ></img>{" "}
          {/* alt为默认图片,*/}
          <div className="PicStyle">
            <img
              src={this.props.ChangePicId.PicAdress}
              alt=""
              className={"ImgStyle" + hide}
            ></img>
          </div>
          <div className="Footer">
            <div className="glass-container" id="glass"></div>
          </div>
        </div>
      </div>
    );
  }
}
class Select extends React.Component {
  //选择部分
  onClick = (e) => {
    if (gameState.choiceId <= SelectContent.length - 1) {
      if (gameState.choiceId !== SelectContent.length - 1) {
        gameState.choiceId += 1;
      }
      this.props.getClickEvent(true);
    }
  };
  render() {
    let hide = " hide";
    let id = 0;
    if (this.props.ChoiceControl === true) {
      hide = "";
    }
    return (
      <div className={"selectStyle" + hide}>
        <div className={"midSelectStyle" + hide}>
          {SelectContent[gameState.choiceId].choice.map((item) => (
            <div
              onClick={this.onClick}
              className={"choiceStyle" + hide}
              id={id}
              key={id++}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class Dialog extends React.Component {
  //对话框组件

  state = {
    name: DialogContent[gameState.textId].name,
    text: DialogContent[gameState.textId].text,
    timer: null,
    DoubleClick: false,
  };
  timer = setInterval(function () {}, 1000);
  componentDidMount() {
    this.props.getGameState(DialogContent[gameState.textId]);
  }
  componentWillUpdate() {
    for (let i = 1; i <= this.timer; i++) {
      clearInterval(i);
    }
  }
  componentDidUpdate() {
    //控制文字打印
    const Dialog = document.getElementsByClassName("TextStyle")[0];
    let text;
    let DialogText = "";
    let i = 1;
    if (this.state.DoubleClick === false) {
      this.timer = setInterval(() => {
        text = this.state.text;
        DialogText = text.substring(0, i);
        i++;
        Dialog.innerHTML = DialogText;
        if (DialogText === text) {
          clearInterval(this.timer);
        }
      }, 80);
    } else if (this.state.DoubleClick === true) {
      text = this.state.text;
      Dialog.innerHTML = text;
    }
  }

  Next = (next) => {
    if (DialogContent[gameState.textId].problemSet !== true) {
      //没有设置问题时
      if (gameState.textId < DialogContent.length - 1) {
        //文字改变
        if (next === true) {
          gameState.textId++;
        } //当前对话id++
        this.setState({
          name: DialogContent[gameState.textId].name,
          text: DialogContent[gameState.textId].text,
        });
        this.props.getGameState(DialogContent[gameState.textId]); //此处传递当前整个对话的数组对象给App组件
      }
    } else {
      if (DialogContent[gameState.textId].problemSet === true) {
        //设置问题时
        this.props.getAnswer(0);

        if (this.props.AnswerCheck === 1) {
          //回答正确时
          if (gameState.textId < DialogContent.length - 1) {
            //文字改变
            if (next === true) {
              gameState.textId++;
            } //当前对话id++
            this.setState({
              name: DialogContent[gameState.textId].name,
              text: DialogContent[gameState.textId].text,
            });
            this.props.getGameState(DialogContent[gameState.textId]); //此处传递当前整个对话的数组对象给App组件
          }
        } else if (this.props.AnswerCheck === 0) {
          //回答错误时
          if (next === true) {
            this.setState({
              text: WrongText[gameState.WrongTextId].text,
            });
          }
          if (gameState.WrongTextId < WrongText.length - 1) {
            gameState.WrongTextId++;
          }
        } else if (this.props.AnswerCheck === -1) {
          //不需要回答时
        }
      }
    }
  };
  onClick = (e) => {
    //点击下一个按键执行

    if (DialogContent[gameState.textId].video === true) {
      this.Next(true);
      this.setState({
        DoubleClick: false,
      });
    } else if (this.props.ClickSignal === true) {
      this.Next(true);
      this.setState({
        DoubleClick: false,
      });
    } else if (this.state.DoubleClick === false) {
      this.Next(false);
      this.setState({
        DoubleClick: true,
      });
    } else if (this.state.DoubleClick === true) {
      this.Next(true);
      this.setState({
        DoubleClick: false,
      });
    }
    console.log(DialogContent[gameState.textId]);
  };

  render() {
    let DialogHide = "";
    let NameHide = "";
    let fontBold = "";
    let disabled = "";
    if (this.props.DialogShow === false) {
      DialogHide = " hidden";
    } else {
      DialogHide = " show";
    }
    if (DialogContent[gameState.textId].name === undefined) {
      NameHide = " hidden";
    }
    if (DialogContent[gameState.textId].choice === true) {
      disabled = " disabled";
    } else {
      disabled = "";
    }
    if (this.props.ClickSignal === true) {
      this.onClick();
      this.props.getClickEvent(false);
    }

    return (
      <div
        className={"DialogStyle" + DialogHide + disabled}
        onClick={this.onClick}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={"NameStyle" + NameHide}>
            <h2>{this.state.name}</h2>
          </div>
          <div className={"TextStyle" + fontBold} ref={this.textRef}></div>
          <Video VideoControl={this.props.VideoPaly}></Video>
        </div>
      </div>
    );
  }
}

class Audio extends React.Component {
  style = {
    display: "none",
  };
  componentDidMount() {
    document.getElementById("BGM").volume = 0.7;
    document.getElementById("BGM").play();
  }
  render() {
    // document.getElementById("BGM").volume = 0.2;
    return (
      <>
        <audio
          id={"BGM"}
          src={this.props.ChangeAudio.BgmAdress}
          controls
          autoPlay={true}
          loop={true}
          style={this.style}
        >
          {" "}
        </audio>{" "}
        {/* 游戏内背景音乐 */}
        <audio
          id={"Character"}
          src={this.props.ChangeAudio.NpcAudioAdress}
          controls
          autoPlay={true}
          style={this.style}
        ></audio>{" "}
        {/* 角色台词 */}
      </>
    );
  }
}
class Video extends React.Component {
  style = {
    autoPlay: true,
    position: "fixed",
    width: "calc(100vw)",
    height: "calc(100vh)",
    zIndex: "100",
    top: "0px",
    objectFit: "fill",
  };
  render() {
    let hide = "";
    if (this.props.VideoControl.videoHide === true) {
      hide = " hide";
    } else {
      hide = "";
    }
    return (
      <>
        <video
          src={this.props.VideoControl.video}
          style={this.style}
          autoPlay={true}
          className={hide}
          muted={true}
        ></video>
      </>
    );
  }
}

class App extends React.Component {
  state = {
    PicAdress: "",
    ScencePicAdress: "",
    BgmAdress: "ProjectRes/BGM/Silence.wav",
    NpcAudioAdress: "",
    video: "",
    NavPic: "",
    videoHide: false,
    ProblemSet: false,
    Choice: false,
    DialogShow: true,
    SelectClick: false,
    Answer: 0,
  };
  getGameState = (obj) => {
    //todo: 如何直接把图片的地址传到sence组件中
    //图片切换
    if (obj.changePic === true) {
      this.setState({
        PicAdress: obj.pic,
      });
    }
    //场景切换
    if (obj.changeScence === true) {
      this.setState({
        ScencePicAdress: obj.scence,
      });
    }
    //页脚图片切换
    if (obj.NavChange === true) {
      this.setState({
        NavPic: obj.scence,
      });
    }
    //背景音乐切换
    if (obj.changeBgm === true) {
      this.setState({
        BgmAdress: obj.Bgm,
      });
    } else if (obj.changeBgm === false) {
      this.setState({
        BgmAdress: "ProjectRes/BGM/Silence.wav",
      });
    }
    //角色台词切换
    if (obj.changeNpcAudio === true) {
      this.setState({
        NpcAudioAdress: obj.NpcAudio,
      });
    } else {
      this.setState({
        NpcAudioAdress: "",
      });
    }
    //选项获取
    if (obj.choice === true) {
      this.setState({
        Choice: true,
      });
    } else {
      this.setState({
        Choice: false,
      });
    }
    //问题设置
    if (obj.problemSet === true) {
      this.setState({
        ProblemSet: true,
      });
    } else {
      this.setState({
        ProblemSet: false,
      });
    }
    //控制对话框是否显示
    if (obj.DialogShow === false) {
      this.setState({
        DialogShow: false,
      });
    } else {
      this.setState({
        DialogShow: true,
      });
    }
    //视频资源显示
    if (obj.video === true) {
      this.setState({
        video: obj.videoAdress,
        videoHide: false,
      });
    } else {
      this.setState({
        videoHide: true,
      });
    }
  };

  getAnswer = (answer) => {
    if (answer === -1) {
      //不需要使用编辑器
      this.setState({
        Answer: -1,
      });
    } else if (answer === 0) {
      //回答错误
      this.setState({
        Answer: 0,
      });
    } else if (answer === 1) {
      //回答正确
      this.setState({
        Answer: 1,
      });
    }
  };
  getClickEvent = (bool) => {
    if (bool === true) {
      this.setState({
        SelectClick: true,
      });
    } else {
      this.setState({
        SelectClick: false,
      });
    }
  };
  render() {
    return (
      <div className="App">
        <div className="window">
          <Scence ChangePicId={this.state}></Scence>
          <Select
            ChoiceControl={this.state.Choice}
            getClickEvent={this.getClickEvent}
          ></Select>
          <Editor
            problemSet={this.state.ProblemSet}
            getClickEvent={this.getClickEvent}
            getAnswer={this.getAnswer}
          ></Editor>
        </div>
        <Dialog
          getGameState={this.getGameState}
          getClickEvent={this.getClickEvent}
          getAnswer={this.getAnswer}
          AnswerCheck={this.state.Answer}
          DialogShow={this.state.DialogShow}
          VideoPaly={this.state}
          ClickSignal={this.state.SelectClick}
        ></Dialog>
        <Audio ChangeAudio={this.state}></Audio>
      </div>
    );
  }
}

export default App;
//npm install --legacy-peer-deps @uiw/react-codemirror
