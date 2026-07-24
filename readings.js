/**
 * Built-in graded Chinese reading collection (HSK 1–6).
 * Used for: pick-from-collection + daily seeded pick (when live fetch fails).
 */
var READING_COLLECTION = [
  // ---- HSK 1 ----
  {
    id: 'hsk1-hello',
    level: 1,
    title: '你好！',
    description: 'Meeting someone new',
    text: '你好！我叫小明。我是学生。我喜欢狗和猫。今天天气很好。我去学校学习。老师很好。同学们也很好。我喜欢看书和喝茶。再见！',
  },
  {
    id: 'hsk1-family',
    level: 1,
    title: '我的家',
    description: 'Family members',
    text: '我家有爸爸、妈妈和我。爸爸是老师，妈妈喜欢买东西。我们住在北京。我喜欢吃米饭和苹果。爸爸喜欢喝茶，妈妈喜欢喝水。我们都很高兴。',
  },
  {
    id: 'hsk1-day',
    level: 1,
    title: '我的一天',
    description: 'A simple daily routine',
    text: '我每天早上喝水，吃面包。然后我去学校。中午我吃饭。下午我看书。晚上我看电视。九点我睡觉。我喜欢学习汉语。',
  },
  {
    id: 'hsk1-shop',
    level: 1,
    title: '去商店',
    description: 'Shopping basics',
    text: '我想买水果。苹果多少钱？三块钱。好，我买五个。谢谢！不客气。我还想喝茶。这是水，那是茶。很好！',
  },
  {
    id: 'hsk1-friends',
    level: 1,
    title: '朋友',
    description: 'Friends and hobbies',
    text: '我有一个朋友。他叫小李。他喜欢猫，我喜欢狗。我们一起去学校。我们看书、说话、喝茶。今天很高兴。再见，朋友！',
  },

  // ---- HSK 2 ----
  {
    id: 'hsk2-weekend',
    level: 2,
    title: '周末计划',
    description: 'Weekend plans',
    text: '这个周末我想出去玩。早上我起床以后先跑步，然后吃早饭。上午我去商店买水果和牛奶。下午我看一本书，晚上和朋友一起吃饭。虽然有一点儿累，但是很开心。',
  },
  {
    id: 'hsk2-hospital',
    level: 2,
    title: '看病',
    description: 'At the hospital',
    text: '昨天我有一点儿不舒服，所以去了医院。医生问我：“你怎么了？”我说头很疼。医生让我多休息，多喝水。妈妈说不要担心，休息两天就好了。',
  },
  {
    id: 'hsk2-weather',
    level: 2,
    title: '天气变化',
    description: 'Talking about weather',
    text: '今天早上天气很冷，我穿了很多衣服。中午太阳出来了，有一点儿热。下午开始下雨，路上的人不多。晚上雨停了，空气很好。明天会更冷吗？我还不知道。',
  },
  {
    id: 'hsk2-school',
    level: 2,
    title: '在学校',
    description: 'School life',
    text: '我每天七点半到学校。第一节课是汉语课，老师说话很慢，我能听懂。中午我和同学一起吃饭，大家说说笑笑。下午我们打篮球。放学以后我坐公共汽车回家。',
  },
  {
    id: 'hsk2-guest',
    level: 2,
    title: '客人来了',
    description: 'Hosting a guest',
    text: '今天朋友来我家。我请他坐，给他倒茶。我们一起看电视，还吃了一些水果。他说我家很干净。晚上他要回家，我送他到门口。我说：“下次再来玩！”',
  },

  // ---- HSK 3 ----
  {
    id: 'hsk3-travel',
    level: 3,
    title: '第一次旅行',
    description: 'A short trip',
    text: '去年暑假我和父母去了上海。我们坐火车，路上大概用了五个小时。到了以后，我们先找酒店休息。第二天去了公园和商店。虽然人很多，但是风景真漂亮。我觉得旅行不但有意思，而且能学到很多东西。',
  },
  {
    id: 'hsk3-hobby',
    level: 3,
    title: '我的爱好',
    description: 'Hobbies and free time',
    text: '我有很多爱好。以前我只喜欢看电视，现在更喜欢运动。每周我至少去三次体育馆。有时候我也学做饭，因为自己做的菜比较健康。如果周末下雨，我就在家听音乐或者练习写汉字。',
  },
  {
    id: 'hsk3-mistake',
    level: 3,
    title: '犯错误',
    description: 'Learning from mistakes',
    text: '学汉语的时候，我常常犯错误。有一次，我把“买”说成“卖”，朋友听了都笑了。老师说：“不要害怕出错，错误其实是最好的老师。”从那以后，我更愿意多说多练。现在我进步了很多。',
  },
  {
    id: 'hsk3-neighbor',
    level: 3,
    title: '新邻居',
    description: 'Meeting a new neighbor',
    text: '上个月，我们楼里来了一位新邻居。她很年轻，在附近的公司工作。第一次见面时，她送了我们一些水果。后来我们经常在电梯里聊天。她说她很喜欢这个城市，希望以后能常常见面。',
  },
  {
    id: 'hsk3-exam',
    level: 3,
    title: '准备考试',
    description: 'Preparing for a test',
    text: '下个星期我有重要的考试，所以最近每天都在复习。早上背单词，下午做练习，晚上再看一遍笔记。虽然有时候觉得很累，但是我想考个好成绩。朋友还帮我检查作业，真的很感谢他。',
  },

  // ---- HSK 4 ----
  {
    id: 'hsk4-environment',
    level: 4,
    title: '保护环境',
    description: 'Protecting the environment',
    text: '最近大家越来越关心环境问题。空气污染、垃圾太多，都会影响我们的健康。其实每个人都可以做一些简单的事情：少用塑料袋、多坐公共汽车、节约用水。只要我们坚持下去，城市会变得更干净，生活也会更舒服。',
  },
  {
    id: 'hsk4-online',
    level: 4,
    title: '网络生活',
    description: 'Life online',
    text: '互联网改变了我们的生活方式。我们可以通过手机购物、学习，甚至和远方的朋友聊天。不过，如果花太多时间看手机，也容易影响睡眠和眼睛。我觉得最重要的是合理安排时间，让网络成为帮助我们进步的工具，而不是浪费时间的借口。',
  },
  {
    id: 'hsk4-culture',
    level: 4,
    title: '了解中国文化',
    description: 'Chinese culture',
    text: '学习语言不只是记单词和语法，还应该了解文化。比如中国人过春节时会回家团聚，吃饺子，说吉利的话。通过了解这些习惯，外国朋友更容易理解中国人的想法。反过来，我们也可以分享自己国家的文化，这样交流会更有意思。',
  },
  {
    id: 'hsk4-job',
    level: 4,
    title: '找工作',
    description: 'Looking for a job',
    text: '大学毕业以后，我开始找工作。我投了很多简历，也参加了几次面试。有的公司要求有工作经验，有的更看重学习能力。最后我找到了一份自己喜欢的工作。虽然刚开始工资不高，但是能学到很多东西，我觉得很值得。',
  },
  {
    id: 'hsk4-city',
    level: 4,
    title: '大城市的生活',
    description: 'Life in a big city',
    text: '住在大城市有很多方便的地方：交通发达，商店多，机会也多。不过房租比较贵，上班路上有时候也很堵。有人喜欢这种快节奏，也有人觉得太累，想搬到小城市。对我来说，只要身边有朋友，生活就会充实。',
  },

  // ---- HSK 5 ----
  {
    id: 'hsk5-education',
    level: 5,
    title: '教育的意义',
    description: 'The meaning of education',
    text: '很多人觉得教育的目的就是考试和找工作，但我觉得教育更重要的是培养思考能力。一个会独立思考的人，遇到困难时不容易放弃，也能理解别人的立场。学校不仅教知识，还应该鼓励学生提出问题、尝试新方法。这样社会才会不断进步。',
  },
  {
    id: 'hsk5-technology',
    level: 5,
    title: '科技与生活',
    description: 'Technology and daily life',
    text: '科技发展得越来越快，人工智能、智能手机已经深入到生活的各个方面。它们提高了效率，也带来了新的挑战，比如隐私安全和虚假信息。我们既要积极使用新技术，也要保持警惕，学会判断信息是否可靠。只有这样，科技才能真正服务人类。',
  },
  {
    id: 'hsk5-friendship',
    level: 5,
    title: '真正的朋友',
    description: 'True friendship',
    text: '真正的朋友不一定每天联系，但在你需要帮助的时候会出现。他们会诚实指出你的问题，也会在你成功时真心为你高兴。随着年龄增长，朋友也许会变少，但关系会更深。珍惜这样的人，比拥有很多表面的关系更重要。',
  },
  {
    id: 'hsk5-pressure',
    level: 5,
    title: '面对压力',
    description: 'Dealing with pressure',
    text: '现代人常常感到压力大：工作任务多，生活节奏快，对未来也充满不确定。适当的压力可以推动我们进步，但长期过度紧张会影响健康。学会休息、运动和与人交流，是管理压力的有效方法。有时候放慢脚步，反而能走得更远。',
  },
  {
    id: 'hsk5-tradition',
    level: 5,
    title: '传统与现代',
    description: 'Tradition and modernity',
    text: '在快速变化的时代，传统和现代常常发生碰撞。有人主张完全接受新事物，有人希望尽量保留旧习惯。其实两者并不矛盾。我们可以用现代方式传播传统文化，也可以从传统中找到解决现代问题的智慧。关键在于理解和尊重，而不是简单对立。',
  },

  // ---- HSK 6 ----
  {
    id: 'hsk6-globalization',
    level: 6,
    title: '全球化时代',
    description: 'The age of globalization',
    text: '全球化使不同国家的经济和文化联系更加紧密。人们可以更容易地跨境旅行、留学和合作，但同时也可能面临文化冲突和资源分配不均等问题。如何在开放交流的同时保护本地特色，是许多社会需要认真思考的课题。只有相互尊重、平等对话，才能实现真正的共同发展。',
  },
  {
    id: 'hsk6-media',
    level: 6,
    title: '媒体素养',
    description: 'Media literacy',
    text: '在信息爆炸的时代，媒体素养变得尤为重要。面对铺天盖地的新闻和评论，我们需要具备辨别真伪的能力，避免被情绪化的标题误导。阅读多角度的报道、查证原始来源、保持独立判断，都是现代公民应具备的基本素质。否则，谣言比真相传播得更快。',
  },
  {
    id: 'hsk6-career',
    level: 6,
    title: '职业选择',
    description: 'Choosing a career',
    text: '选择职业时，人们往往在兴趣、收入和稳定性之间犹豫不决。有人追求高薪，有人更看重个人价值和社会贡献。其实没有唯一正确的答案。关键是了解自己的优势，并愿意为长远目标付出努力。职业道路很少是一条直线，适时调整方向也是一种智慧。',
  },
  {
    id: 'hsk6-ethics',
    level: 6,
    title: '科技伦理',
    description: 'Ethics of technology',
    text: '随着人工智能和生物技术的迅速发展，科技伦理问题日益突出。技术本身是中性的，但使用方式会深刻影响社会公平与个人权利。制定合理的规则、加强公众讨论、要求企业承担责任，都是不可忽视的环节。只有把伦理放在创新之前考虑，发展才可能可持续。',
  },
  {
    id: 'hsk6-language',
    level: 6,
    title: '语言与思维',
    description: 'Language and thought',
    text: '语言不仅是交流工具，也在一定程度上塑造我们的思维方式。学习一门新语言，往往意味着接触另一种观察世界的角度。因此，多语言能力不仅提高沟通效率，还能增强跨文化理解。在全球化背景下，这种能力越来越珍贵，值得长期投入。',
  },
];

/** @returns {typeof READING_COLLECTION} */
function getReadingsForLevel(level) {
  const n = Number(level);
  return READING_COLLECTION.filter((r) => Number(r.level) === n);
}

function getReadingById(id) {
  return READING_COLLECTION.find((r) => r.id === id) || null;
}

/**
 * Deterministic daily pick from the built-in collection for a level.
 * Same calendar day + level → same reading (local time).
 */
function getSeededDailyReading(level, date = new Date()) {
  const list = getReadingsForLevel(level);
  if (!list.length) return null;
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const seed = y * 10000 + m * 100 + d + Number(level) * 17;
  const idx = seed % list.length;
  const item = list[idx];
  return {
    ...item,
    id: `daily-${item.id}-${y}-${m}-${d}`,
    title: `今日阅读 · ${item.title}`,
    description: `HSK ${level} · ${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')} · ${item.description || ''}`,
    source: 'collection-daily',
  };
}
