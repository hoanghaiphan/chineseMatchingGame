const fs = require('fs');
const https = require('https');

const vocab = JSON.parse(fs.readFileSync('./vocabulary.json', 'utf8'));

const HANZI_QUERY = {
  爱: 'red heart shape', 八: 'digit numeral 8', 爸爸: 'father holding child', 杯子: 'glass cup drink', 北京: 'Beijing Forbidden City',
  本: 'notebook book', 不: 'prohibited sign', 不客气: 'thank you gesture', 菜: 'chinese food vegetables',
  茶: 'green tea cup', 吃: 'eating noodles', 出租车: 'yellow taxi', 打电话: 'smartphone call', 大: 'elephant animal',
  点: 'dot punctuation point', 电脑: 'laptop computer screen', 电视: 'television screen', 电影: 'movie theater screen', 东西: 'miscellaneous objects things',
  都: 'crowd people group', 读: 'reading book', 对不起: 'sorry bow apology', 多: 'many boxes stacked',
  多少: 'numbers digits', 儿子: 'boy child', 二: 'number 2', 饭馆: 'restaurant dining', 飞机: 'airplane sky',
  分钟: 'clock face', 高兴: 'happy smile face', 工作: 'office desk', 狗: 'golden retriever dog', 汉语: 'chinese characters',
  好: 'thumbs up', 喝: 'drinking water', 和: 'handshake together', 很: 'exclamation mark', 后面: 'back arrow behind',
  回: 'return arrow', 会: 'meeting people', 火车站: 'train station', 几: 'question mark how many', 家: 'house family home',
  叫: 'calling shouting', 今天: 'calendar today', 九: 'number 9', 开: 'open door key', 看: 'eye looking',
  看见: 'person looking seeing', 块: 'chinese yuan banknote', 来: 'person arriving coming', 老师: 'teacher blackboard classroom', 冷: 'ice cubes frozen',
  里: 'inside room', 零: 'zero number 0', 六: 'number 6', 妈妈: 'mother child hug', 吗: 'question mark red',
  买: 'shopping bags', 猫: 'tabby cat', 没: 'empty nothing', 没关系: 'ok hand gesture', 米饭: 'bowl rice',
  名字: 'name tag', 明天: 'calendar tomorrow', 哪: 'direction sign arrow', 那: 'pointing finger', 能: 'strong muscle',
  你: 'pointing you', 年: 'calendar year', 女儿: 'girl child', 朋友: 'two friends', 漂亮: 'beautiful rose flower',
  苹果: 'red apple', 七: 'number 7', 前面: 'forward arrow front', 钱: 'paper money', 请: 'please welcome',
  去: 'airport departure', 热: 'hot sun thermometer', 人: 'person silhouette', 认识: 'handshake meeting',
  日: 'sun daylight', 三: 'number 3', 商店: 'shop store front', 上: 'up arrow', 上午: 'morning sunrise',
  少: 'few coins', 什么: 'what question mark', 十: 'number 10', 时候: 'wall clock', 是: 'green checkmark yes',
  书: 'open book', 谁: 'who question person', 水: 'water splash clear', 水果: 'fruit basket', 睡觉: 'sleeping bed',
  说话: 'people talking', 四: 'number 4', 岁: 'birthday cake', 他: 'man person', 她: 'woman person', 太: 'very much',
  天气: 'cloud sun weather', 听: 'ear listening', 同学: 'students classroom', 喂: 'telephone hello', 我: 'person me pointing',
  我们: 'group people team', 五: 'number 5', 喜欢: 'heart love red', 下: 'down arrow', 下午: 'afternoon sun',
  下雨: 'rain umbrella', 先生: 'man suit businessman', 现在: 'clock now present', 想: 'thinking bubble', 小: 'small mouse',
  小姐: 'young woman', 写: 'writing pen paper', 谢谢: 'thank you bow', 星期: 'week calendar', 学生: 'student backpack',
  学习: 'studying books', 学校: 'school building', 一: 'number 1', 衣服: 't-shirt clothing', 医生: 'doctor stethoscope',
  医院: 'hospital building', 椅子: 'wooden chair', 有: 'checkmark have yes', 月: 'full moon', 再见: 'waving goodbye',
  在: 'location pin map', 怎么: 'how question', 怎么样: 'thumbs up down', 这: 'pointing this', 中国: 'china flag',
  中午: 'noon sun sky', 住: 'apartment home', 桌子: 'dining table', 字: 'chinese calligraphy', 昨天: 'yesterday calendar',
  坐: 'sitting chair', 做: 'cooking kitchen', 你好: 'waving hello', 咖啡: 'coffee cup', 鸡蛋: 'chicken eggs',
  牛奶: 'glass milk', 面包: 'bread loaf', 鱼: 'fish aquarium', 鸟: 'bird branch', 花: 'red flower', 树: 'green tree',
  山: 'mountain peak', 河: 'river water', 雨: 'rain falling', 雪: 'snow winter', 太阳: 'bright sun', 月亮: 'moon night',
  火: 'fire flames', 车: 'car automobile', 船: 'sailboat', 自行车: 'bicycle', 火车: 'bullet train', 手机: 'smartphone',
  游泳: 'swimming pool', 跑步: 'running jogger', 足球: 'soccer ball', 篮球: 'basketball', 唱歌: 'singing microphone',
  跳舞: 'ballet dance', 笑: 'laughing smile', 哭: 'crying tears', 饿: 'hungry food', 渴: 'water bottle thirsty',
  // Grammar particles & abstract words — short symbolic search terms that Wikimedia can match
  的: 'chain link', 了: 'checkmark', 吗: 'question mark', 吧: 'speech bubble', 呢: 'speech bubble',
  把: 'hand holding', 被: 'blanket quilt', 给: 'gift box', 对: 'checkmark', 从: 'arrow',
  向: 'compass arrow', 跟: 'footsteps', 比: 'balance scale', 还: 'circular arrow', 就: 'pointing finger',
  才: 'hourglass', 又: 'circular arrow', 再: 'refresh icon', 已经: 'clock', 因为: 'domino effect',
  所以: 'arrow sign', 但是: 'crossroads', 如果: 'diagram', 虽然: 'umbrella',
  也: 'plus sign', 让: 'open gate', 等: 'waiting line', 只: 'number one',
  要: 'exclamation mark', 会: 'light bulb', 能: 'strong arm', 没: 'empty box',
  什么: 'question mark', 怎么: 'question mark', 为什么: 'question mark',
  可以: 'thumbs up', 应该: 'road sign', 可能: 'question mark', 或者: 'fork road',
  而且: 'plus sign', 并: 'jigsaw puzzle', 过: 'finish line', 着: 'progress bar',
  啊: 'exclamation mark', 呀: 'exclamation mark', 哦: 'light bulb', 嗯: 'thinking face',
};

const ABSTRACT_MEANING_QUERY = [
  [/possessive particle|~\s*'s\b/i, 'chain link connected'],
  [/completed action marker/i, 'checkmark done complete'],
  [/modal particle|sentence-final particle/i, 'speech bubble punctuation'],
  [/question particle/i, 'question mark punctuation'],
  [/\(used to indicate passive\b/i, 'arrow receiving action passive'],
  [/classifier:.*handful|to grasp.*handlebar/i, 'hand grasping handle'],
  [/\bif;\s*in case\b|\bin the event that\b/i, 'flowchart decision tree'],
  [/\balthough;\s*even though\b/i, 'umbrella despite rain'],
  [/\btherefore;\s*as a result\b/i, 'arrow conclusion therefore'],
  [/\bbecause;\s*owing to\b/i, 'domino effect cause chain'],
  [/\balready\b/i, 'clock checkmark done'],
  [/\(once\) again\b|\bonce more\b|\bre-\b/i, 'circular arrows repeat'],
  [/\bbut;\s*however\b/i, 'fork road two paths'],
  [/\bright;\s*correct\b.*\btowards\b/i, 'checkmark correct right'],
  [/\bto give\b|\bfor the benefit of\b/i, 'hands giving gift'],
  [/\bto follow closely\b|\bto go with\b/i, 'footsteps following path'],
  [/\btowards;\s*at;\s*for\b/i, 'direction arrow compass'],
  [/\bcompare\b|\bcontrast\b/i, 'balance scale comparison'],
  [/\bto cover \(with\)\b/i, 'blanket covering'],
  [/\bto hold;\s*to grasp\b/i, 'hand holding object'],
  [/\bnot;\s*un-\b|\bno;\s*not so\b/i, 'no entry prohibited sign'],
  [/\bcan;\s*to be able\b|\bcapable of\b/i, 'strong arm capability'],
  [/\bwant\b|\bneed\b|\bmust\b/i, 'pointing finger want'],
  [/\bstill\b|\byet\b/i, 'hourglass waiting still'],
  [/\bonly\b|\bmerely\b|\bjust;\s*precisely\b/i, 'single one only'],
  [/\bboth\.\.\. and\b/i, 'two items together pair'],
  [/\bor\b.*\balternatively\b/i, 'fork path either or'],
  [/\bvery\b|\bquite\b|\bextremely\b/i, 'exclamation mark emphasis'],
  [/\ball\b|\bevery\b|\beach\b/i, 'crowd group everyone'],
  [/\bexist\b|\bthere is\b|\bto have\b/i, 'checkmark have possess'],
  [/\bbe located\b|\bat; in\b/i, 'map pin location'],
  [/\bbefore\b|\bafter\b|\bduring\b/i, 'timeline arrow sequence'],
  [/\bwith\b|\btogether\b|\band\b/i, 'handshake together'],
  [/\bwithout\b|\black of\b|\babsence\b/i, 'empty void nothing'],
  [/\bmore\b|\bmost\b|\bincrease\b/i, 'up arrow increase more'],
  [/\bless\b|\bfewer\b|\bdecrease\b/i, 'down arrow decrease less'],
  [/\bsame\b|\bsimilar\b|\bdifferent\b/i, 'compare contrast symbols'],
  [/\bimportant\b|\bessential\b|\bcrucial\b/i, 'star important highlight'],
  [/\bpossible\b|\bperhaps\b|\bmaybe\b/i, 'question mark possibility'],
  [/\bnecessary\b|\bshould\b|\bought to\b/i, 'signpost direction should'],
  [/\bfeel\b|\bemotion\b|\bmood\b/i, 'emoji face emotion'],
  [/\bthink\b|\bthought\b|\bidea\b/i, 'thought bubble thinking'],
  [/\bknow\b|\bknowledge\b|\bunderstand\b/i, 'brain knowledge lightbulb'],
  [/\bsay\b|\bspeak\b|\btell\b/i, 'speech bubble talking'],
  [/\bhear\b|\blisten\b/i, 'ear listening sound'],
  [/\bsee\b|\blook\b|\bwatch\b/i, 'eye looking seeing'],
  [/\bwalk\b|\bgo\b|\bcome\b/i, 'footsteps walking path'],
  [/\bstop\b|\bend\b|\bfinish\b/i, 'stop sign end'],
  [/\bstart\b|\bbegin\b/i, 'starting line begin'],
  [/\bwait\b|\bwaiting\b/i, 'hourglass waiting'],
  [/\btry\b|\battempt\b/i, 'target aim try'],
  [/\buse\b|\busing\b/i, 'tool wrench using'],
  [/\bput\b|\bplace\b|\bset\b/i, 'placing object down'],
  [/\btake\b|\bget\b|\bobtain\b/i, 'hand taking grabbing'],
  [/\bleave\b|\bdepart\b/i, 'exit door leaving'],
  [/\barrive\b|\breach\b/i, 'entrance arriving'],
  [/\bchange\b|\bbecome\b|\bturn into\b/i, 'transformation arrow change'],
  [/\bkeep\b|\bremain\b|\bstay\b/i, 'anchor stay fixed'],
  [/\bhelp\b|\bassist\b/i, 'helping hand support'],
  [/\blet\b|\ballow\b|\bpermit\b/i, 'open door allow'],
  [/\bprevent\b|\bstop\b|\bavoid\b/i, 'barrier block stop'],
  [/\blike\b|\bprefer\b|\bfavorite\b/i, 'heart favorite like'],
  [/\bhate\b|\bdislike\b/i, 'thumbs down dislike'],
  [/\bhope\b|\bwish\b/i, 'star wish hope'],
  [/\bworry\b|\bfear\b|\bafraid\b/i, 'worried face fear'],
  [/\bremember\b|\bforget\b/i, 'brain memory remember'],
  [/\bchoose\b|\bselect\b|\bdecide\b/i, 'pointing choice select'],
  [/\bwin\b|\blose\b|\bdefeat\b/i, 'trophy victory win'],
  [/\btrue\b|\bfalse\b|\blie\b/i, 'true false symbols'],
  [/\breal\b|\bfake\b|\bactual\b/i, 'magnifying glass real'],
  [/\beasy\b|\bdifficult\b|\bhard\b/i, 'easy hard scale difficulty'],
  [/\bfree\b|\bcost\b|\bprice\b/i, 'free tag price label'],
  [/\bpublic\b|\bprivate\b/i, 'public private signs'],
  [/\bopen\b|\bclosed\b/i, 'open closed door signs'],
  [/\bfirst\b|\blast\b|\bnext\b/i, 'first last number order'],
  [/\bother\b|\banother\b|\belse\b/i, 'other alternative option'],
  [/\bsome\b|\bany\b|\bevery\b/i, 'some any quantity'],
  [/\bmany\b|\bmuch\b|\blot\b/i, 'many stacked items'],
  [/\bfew\b|\blittle\b/i, 'few small amount'],
  [/\bwhole\b|\bpart\b|\bhalf\b/i, 'pie chart fraction part'],
  [/\balways\b|\bnever\b|\bsometimes\b/i, 'infinity always symbol'],
  [/\bhere\b|\bthere\b/i, 'here there pointing arrows'],
  [/\bnow\b|\bthen\b|\blater\b/i, 'clock now time'],
  [/\btoo\b|\balso\b|\bas well\b/i, 'plus also addition'],
  [/\beven\b|\bstill\b/i, 'equal balance even'],
  [/\babout\b|\baround\b|\bapproximately\b/i, 'about approximately tilde'],
  [/\baccording to\b|\bbased on\b/i, 'document reference based'],
  [/\bin order to\b|\bso as to\b/i, 'goal target arrow purpose'],
  [/particle/i, 'punctuation marks grammar'],
  [/conjunction/i, 'chain links connected'],
  [/preposition/i, 'arrow direction position'],
  [/adverb/i, 'speed motion arrow'],
  [/adjective/i, 'color palette description'],
  [/verb/i, 'action movement gesture'],
  [/surname\b/i, 'family name tag badge'],
  [/variant of\b/i, 'arrow alternate version'],
  [/abbr\. for\b/i, 'abbreviation acronym text'],
  [/literary\b/i, 'ancient book literature'],
  [/coll\.\)/i, 'casual conversation speech'],
  [/bound form\b/i, 'puzzle piece connected bound'],
  [/onom\.\)/i, 'sound wave audio symbol'],
  [/loanword\b/i, 'globe language translation'],
];

const MEANING_QUERY = [
  [/\bdog\b/i, 'dog pet'], [/\bcat\b/i, 'cat pet'], [/\bwater\b/i, 'water glass'], [/\btea\b/i, 'tea cup'],
  [/\bcoffee\b/i, 'coffee cup'], [/\brice\b/i, 'rice bowl'], [/\bapple\b/i, 'apple fruit'], [/\bfruit\b/i, 'fresh fruit'],
  [/\bbook\b/i, 'open book'], [/\bschool\b|\bteacher\b/i, 'school classroom'], [/\bstudent\b/i, 'student school'],
  [/\bcomputer\b/i, 'computer laptop'], [/\bphone\b|\btelephone\b/i, 'mobile phone'], [/\bmovie\b|\bfilm\b/i, 'cinema'],
  [/\btelevision\b|\btv\b/i, 'television'], [/\bcar\b/i, 'car'], [/\btaxi\b/i, 'taxi'], [/\bairplane\b|\bplane\b/i, 'airplane'],
  [/\btrain\b/i, 'train'], [/\bbus\b/i, 'bus'], [/\bbicycle\b|\bbike\b/i, 'bicycle'], [/\bsleep\b/i, 'sleeping bed'],
  [/\bhappy\b|\bglad\b|\bsmile\b/i, 'happy smile'], [/\bsad\b|\bcry\b/i, 'crying'], [/\bmother\b|\bmom\b/i, 'mother baby'],
  [/\bfather\b|\bdad\b/i, 'father child'], [/\bson\b/i, 'boy'], [/\bdaughter\b/i, 'girl'], [/\bfriend\b/i, 'friends'],
  [/\bbaby\b|\bchild\b/i, 'child'], [/\bmoney\b/i, 'money cash'], [/\bshop\b|\bstore\b/i, 'store shop'], [/\bwork\b|\bjob\b|\boffice\b/i, 'office'],
  [/\bhome\b|\bhouse\b/i, 'house'], [/\bfamily\b/i, 'family'], [/\bsun\b|\bhot\b/i, 'sun'], [/\bcold\b|\bsnow\b|\bice\b/i, 'snow'],
  [/\brain\b/i, 'rain'], [/\bwind\b/i, 'wind'], [/\bcloud\b|\bweather\b/i, 'cloudy sky'], [/\bclock\b|\btime\b|\bminute\b/i, 'clock'],
  [/\bcalendar\b|\btoday\b|\btomorrow\b|\byesterday\b/i, 'calendar'], [/\bfood\b|\beat\b|\bmeal\b|\bdish\b/i, 'food plate'],
  [/\bdrink\b/i, 'drinking'], [/\bhospital\b/i, 'hospital'], [/\bdoctor\b/i, 'doctor'], [/\bmedicine\b|\bpill\b/i, 'medicine pills'],
  [/\bshirt\b|\bclothes\b|\bwear\b/i, 'shirt'], [/\bshoe\b/i, 'shoes'], [/\bchair\b/i, 'chair'], [/\btable\b|\bdesk\b/i, 'table'],
  [/\bdoor\b/i, 'door'], [/\bwindow\b/i, 'window'], [/\bbed\b/i, 'bed'], [/\bkitchen\b/i, 'kitchen'], [/\bmountain\b/i, 'mountain'],
  [/\briver\b|\blake\b/i, 'lake'], [/\bsea\b|\bocean\b|\bbeach\b/i, 'beach ocean'], [/\btree\b/i, 'tree'], [/\bflower\b/i, 'flower'],
  [/\bbird\b/i, 'bird'], [/\bfish\b/i, 'fish'], [/\bhorse\b/i, 'horse'], [/\bcow\b/i, 'cow'], [/\bpig\b/i, 'pig'],
  [/\bchicken\b/i, 'chicken'], [/\begg\b/i, 'eggs'], [/\bmilk\b/i, 'milk'], [/\bbread\b/i, 'bread'], [/\bmeat\b/i, 'meat'],
  [/\bvegetable\b/i, 'vegetables'], [/\bsoup\b/i, 'soup'], [/\brestaurant\b/i, 'restaurant'], [/\bhotel\b/i, 'hotel'],
  [/\bbank\b/i, 'bank'], [/\bpolice\b/i, 'police'], [/\bfire\b/i, 'fire'], [/\blight\b|\blamp\b/i, 'light bulb'],
  [/\bmoon\b|\bnight\b/i, 'moon'], [/\bmorning\b/i, 'sunrise'], [/\bstar\b/i, 'stars'], [/\bchina\b|\bbeijing\b/i, 'great wall china'],
  [/\bjapan\b/i, 'mount fuji'], [/\bmap\b/i, 'world map'], [/\btravel\b/i, 'luggage airport'], [/\bpark\b/i, 'park'],
  [/\bcity\b/i, 'city skyline'], [/\broad\b|\bstreet\b/i, 'street'], [/\bbridge\b/i, 'bridge'], [/\bbuilding\b/i, 'building'],
  [/\bsport\b|\bball\b|\bfootball\b/i, 'soccer ball'], [/\bbasketball\b/i, 'basketball'], [/\bswim\b/i, 'swimming'],
  [/\brun\b/i, 'running'], [/\bdance\b/i, 'dancing'], [/\bmusic\b|\bguitar\b|\bpiano\b/i, 'guitar'], [/\bsing\b|\bsong\b/i, 'singing'],
  [/\bcamera\b|\bphoto\b/i, 'camera'], [/\bletter\b|\bmail\b|\benvelope\b/i, 'envelope'], [/\bstudy\b|\blearn\b/i, 'studying'],
  [/\bexam\b|\btest\b/i, 'exam paper'], [/\blibrary\b/i, 'library'], [/\bgift\b/i, 'gift box'], [/\bparty\b/i, 'party balloons'],
  [/\bbirthday\b/i, 'birthday cake'], [/\bwedding\b/i, 'wedding rings'], [/\bhelp\b/i, 'helping hand'],
  [/\blove\b|\bheart\b/i, 'heart love'], [/\beye\b|\bsee\b|\blook\b/i, 'eye'], [/\bear\b|\blisten\b|\bhear\b/i, 'ear'],
  [/\bhand\b/i, 'hand'], [/\bfoot\b/i, 'foot'], [/\bface\b|\bhead\b/i, 'face'], [/\bmouth\b|\bspeak\b|\btalk\b/i, 'talking'],
  [/\bone\b|1\b/i, 'number 1'], [/\btwo\b|2\b/i, 'number 2'], [/\bthree\b|3\b/i, 'number 3'],
  [/\bfour\b|4\b/i, 'number 4'], [/\bfive\b|5\b/i, 'number 5'], [/\bsix\b|6\b/i, 'number 6'],
  [/\bseven\b|7\b/i, 'number 7'], [/\beight\b|8\b/i, 'number 8'], [/\bnine\b|9\b/i, 'number 9'],
  [/\bten\b|10\b/i, 'number 10'], [/\bzero\b|0\b/i, 'number zero'], [/\bperson\b|\bpeople\b|\bhuman\b|\bman\b|\bwoman\b/i, 'people'],
  [/\bhello\b|\bgreet\b/i, 'waving hello'], [/\bgoodbye\b|\bbye\b/i, 'goodbye wave'], [/\bthank\b/i, 'thank you'],
  [/\bsorry\b/i, 'sorry'], [/\bplease\b/i, 'please'], [/\byes\b|\bcorrect\b|\btrue\b/i, 'checkmark yes'],
  [/\bno\b|\bnot\b/i, 'no sign'], [/\bwhat\b|\bwhich\b/i, 'question mark'], [/\bwho\b/i, 'who'], [/\bhow\b|\bwhy\b/i, 'how'],
  [/\bwhere\b/i, 'map pin'], [/\bbuy\b/i, 'shopping'], [/\bsell\b/i, 'for sale'], [/\bpay\b|\bprice\b/i, 'price tag'],
  [/\bopen\b/i, 'open door'], [/\bclose\b/i, 'closed sign'], [/\bwalk\b/i, 'walking'], [/\bwrite\b|\bpen\b/i, 'pen writing'],
  [/\bread\b/i, 'reading'], [/\bbig\b|\blarge\b/i, 'elephant'], [/\bsmall\b|\blittle\b/i, 'ant small'], [/\bbeautiful\b|\bpretty\b/i, 'rose flower'],
  [/\bnew\b/i, 'new'], [/\bold\b/i, 'antique'], [/\bfast\b/i, 'sports car'], [/\bslow\b/i, 'snail'],
  [/\bstrong\b/i, 'strong'], [/\bweak\b/i, 'weak'], [/\bclean\b/i, 'clean'], [/\bdirty\b/i, 'dirty'],
  [/\bwar\b|\barmy\b|\bsoldier\b/i, 'soldier'], [/\bpeace\b/i, 'peace dove'], [/\bking\b|\bqueen\b|\bcrown\b/i, 'crown'],
  [/\bmarry\b|\bwedding\b/i, 'wedding'], [/\bdie\b|\bdeath\b/i, 'funeral'], [/\bborn\b|\bbirth\b/i, 'newborn baby'],
  [/\bsick\b|\bill\b/i, 'sick thermometer'], [/\bhealth\b/i, 'healthy food'], [/\bexercise\b|\bgym\b/i, 'gym'],
  [/\bcook\b|\bchef\b/i, 'cooking'], [/\bdrive\b/i, 'driving car'], [/\bsit\b/i, 'sitting'], [/\bstand\b/i, 'standing'],
  [/\bfly\b/i, 'flying bird'], [/\bjump\b/i, 'jumping'], [/\bgive\b/i, 'giving gift'], [/\bfind\b|\bsearch\b/i, 'magnifying glass'],
  [/\bwin\b|\bvictory\b/i, 'trophy'], [/\bgame\b|\bplay\b/i, 'board game'], [/\binternet\b|\bweb\b/i, 'wifi'], [/\bemail\b/i, 'email'],
  [/\bnews\b|\bnewspaper\b/i, 'newspaper'], [/\bpaper\b|\bdocument\b/i, 'documents'], [/\bbox\b|\bpackage\b/i, 'box package'],
  [/\bbag\b/i, 'bag'], [/\bkey\b|\block\b/i, 'key'], [/\bname\b/i, 'name badge'], [/\bnumber\b|\bamount\b/i, 'numbers'],
  [/\bred\b/i, 'red'], [/\bblue\b/i, 'blue sky'], [/\bgreen\b/i, 'green'], [/\byellow\b/i, 'yellow'],
  [/\bblack\b/i, 'black'], [/\bwhite\b/i, 'white snow'], [/\bspring\b/i, 'spring flowers'], [/\bsummer\b/i, 'summer beach'],
  [/\bautumn\b|\bfall\b/i, 'autumn leaves'], [/\bwinter\b/i, 'winter'], [/\bleft\b/i, 'left arrow'], [/\bright\b/i, 'right arrow'],
  [/\bup\b/i, 'up arrow'], [/\bdown\b/i, 'down arrow'], [/\bnorth\b/i, 'compass'], [/\bcolor\b/i, 'colors paint'],
];

function getQueries(word) {
  const queries = [];
  const hasHanziQuery = Boolean(HANZI_QUERY[word.hanzi]);

  if (hasHanziQuery) {
    queries.push(HANZI_QUERY[word.hanzi]);
  } else {
    for (const [re, q] of ABSTRACT_MEANING_QUERY) {
      if (re.test(word.meaning) && !queries.includes(q)) queries.push(q);
    }
    for (const [re, q] of MEANING_QUERY) {
      if (re.test(word.meaning) && !queries.includes(q)) queries.push(q);
    }
  }

  if (!queries.length) queries.push('chinese calligraphy brush writing');
  queries.push('chinese character symbol ink');

  return queries;
}

function fetchWikiImageOnce(query) {
  return new Promise((resolve) => {
    const params = new URLSearchParams({
      action: 'query', generator: 'search', gsrsearch: query, gsrnamespace: '6',
      gsrlimit: '8', prop: 'pageimages', piprop: 'thumbnail', pithumbsize: '330', format: 'json',
    });
    https.get(`https://commons.wikimedia.org/w/api.php?${params}`, {
      headers: { 'User-Agent': 'ChineseFlashcardGame/1.0 (educational)' },
    }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try {
          const pages = JSON.parse(data).query?.pages;
          if (!pages) return resolve(null);
          const hit = Object.values(pages).find((page) => page.thumbnail?.source);
          resolve(hit?.thumbnail?.source || null);
        } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchWikiImage(query) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const url = await fetchWikiImageOnce(query);
    if (url) return url;
    await sleep(300 * (attempt + 1));
  }
  return null;
}

async function resolveImage(queries) {
  for (const q of queries) {
    if (!q) continue;
    const url = await fetchWikiImage(q);
    if (url) return { url, query: q };
    await sleep(250);
  }
  return null;
}

function loadExistingImages() {
  try {
    const code = fs.readFileSync('./images.js', 'utf8');
    return JSON.parse(code.replace(/^const WORD_IMAGES = /, '').replace(/;$/, ''));
  } catch {
    return {};
  }
}

async function buildQueryUrlCache(existingImages) {
  const queryUrl = {};

  for (const entry of Object.values(existingImages)) {
    if (entry?.url && entry.query) queryUrl[entry.query] = entry.url;
  }

  const priorityQueries = new Set(Object.values(HANZI_QUERY));
  for (const word of vocab) {
    const queries = getQueries(word);
    for (let i = 0; i < Math.min(queries.length, 3); i++) priorityQueries.add(queries[i]);
  }

  const pending = [...priorityQueries].filter((q) => !queryUrl[q]);
  console.log(`Resolving ${pending.length} priority queries (${priorityQueries.size} total, ${priorityQueries.size - pending.length} cached)...`);

  for (let i = 0; i < pending.length; i++) {
    const q = pending[i];
    const url = await fetchWikiImage(q);
    if (url) queryUrl[q] = url;
    if (i % 50 === 0) console.log(`  query ${i}/${pending.length} — "${q}"`);
    await sleep(80);
  }

  return queryUrl;
}

async function resolveWordImage(word, queryUrl, existingImages) {
  const queries = getQueries(word);
  const prior = existingImages[`${word.hanzi}|${word.pinyin}`];

  for (const q of queries) {
    if (!queryUrl[q]) {
      const url = await fetchWikiImage(q);
      if (url) queryUrl[q] = url;
    }
    if (queryUrl[q]) return { url: queryUrl[q], query: q };
  }

  if (prior?.url) {
    return { url: prior.url, query: prior.query || queries[0] || '', kept: true };
  }

  return null;
}

async function main() {
  const existingImages = loadExistingImages();
  const queryUrl = await buildQueryUrlCache(existingImages);
  const images = {};
  let good = 0;
  let kept = 0;

  for (let i = 0; i < vocab.length; i++) {
    const word = vocab[i];
    const key = `${word.hanzi}|${word.pinyin}`;
    const queries = getQueries(word);
    const result = await resolveWordImage(word, queryUrl, existingImages);

    if (result?.kept) kept++;

    if (result?.url) {
      images[key] = { url: result.url, query: result.query, label: word.hanzi, picturable: true };
      good++;
    } else {
      images[key] = { url: null, query: queries[0] || '', label: word.hanzi, picturable: false };
    }

    if (i % 500 === 0) console.log(`${i}/${vocab.length} — ${word.hanzi}`);
  }

  fs.writeFileSync('./images.js', `const WORD_IMAGES = ${JSON.stringify(images)};`);
  console.log(`Done: ${good}/${vocab.length} words have matching photos (${kept} kept from prior).`);
}

main().catch(console.error);