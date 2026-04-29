/* Shared data extracted from standalone.html */
const HERO_IMAGES = {
  spring: 'https://images.unsplash.com/photo-1579833472711-fd404a240be7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  summer: 'https://images.unsplash.com/photo-1659431246325-52dad0c83dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  autumn: 'https://images.unsplash.com/photo-1737449149992-d515c4801f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  winter: 'https://images.unsplash.com/photo-1769015238618-c5bcb0c42091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
};

const SEASON_META = {
  spring: { emoji: '🌸', label: '春', desc: '樱花飘落，新芽初萌' },
  summer: { emoji: '🌿', label: '夏', desc: '茂叶蔽日，绿意盎然' },
  autumn: { emoji: '🍁', label: '秋', desc: '枫叶如诗，橡果滚落' },
  winter: { emoji: '❄️', label: '冬', desc: '松枝积雪，万籁俱寂' },
};

const FOREST_WINDOWS = [
  { id:'1', image:'https://images.unsplash.com/photo-1772196118216-5dc72a84e249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 松风林 · 深处', mood:'🌅 晨光透过松针，心跳慢了三拍', contributor:'蜗牛旅人' },
  { id:'2', image:'https://images.unsplash.com/photo-1591023626854-371730a148e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 翠竹园 · 雨后', mood:'🌧️ 雨后空气，满是青草和泥土的清香', contributor:'深林行者' },
  { id:'3', image:'https://images.unsplash.com/photo-1579833472711-fd404a240be7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 春日山野 · 山坡', mood:'🌸 樱花飘落的那一刻，时间真的停了', contributor:'粉色观察家' },
  { id:'4', image:'https://images.unsplash.com/photo-1737449149992-d515c4801f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 枫香湾 · 山道', mood:'🍁 踩在落叶上的声音，比任何音乐都好听', contributor:'秋日踏客' },
  { id:'5', image:'https://images.unsplash.com/photo-1769015238618-c5bcb0c42091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 冬日松林 · 雪后', mood:'❄️ 雪地里只有脚步声，安静得像在梦里', contributor:'冬眠准备中' },
  { id:'6', image:'https://images.unsplash.com/photo-1659431246325-52dad0c83dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 蕨叶谷 · 深夏', mood:'🌿 绿到发光的夏天，待着就是治愈', contributor:'绿意沉浸者' },
  { id:'7', image:'https://images.unsplash.com/photo-1759754119817-ff5094560f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 城市绿肺 · 黄昏', mood:'🏙️ 闹市里的一片绿，藏着人们不知道的宁静', contributor:'都市隐居者' },
  { id:'8', image:'https://images.unsplash.com/photo-1772196118216-5dc72a84e249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', location:'📍 鸟鸣谷 · 清晨', mood:'🐦 五点半，鸟儿开始合唱。这是最好的闹钟。', contributor:'早起的虫' },
];

const PARKS = [
  { id:'1', name:'松风林', distance:'450m', description:'清晨有薄雾，松鼠常出没', x:145, y:118, type:'pine',   emoji:'🌲', color:'#5B8C74' },
  { id:'2', name:'翠竹园', distance:'1.2km',description:'雨后竹香，最适合深呼吸', x:390, y:92,  type:'bamboo', emoji:'🎋', color:'#4A7A5B' },
  { id:'3', name:'蕨叶谷', distance:'2.1km',description:'蕨叶遮天，宛如侏罗纪',   x:655, y:148, type:'fern',   emoji:'🌿', color:'#6AAE78' },
  { id:'4', name:'溪边林', distance:'860m', description:'溪水声声，最好脱鞋感受', x:108, y:328, type:'creek',  emoji:'💧', color:'#6088A0' },
  { id:'5', name:'橡果坡', distance:'1.5km',description:'秋天橡果满地，松鼠的天堂',x:515, y:272, type:'oak',   emoji:'🌳', color:'#8B6914' },
  { id:'6', name:'鸟鸣谷', distance:'3.2km',description:'清晨鸟声立体环绕，天然音乐厅',x:222, y:468, type:'bird', emoji:'🐦', color:'#5B7FA0' },
  { id:'7', name:'苔藓小径',distance:'2.5km',description:'绿苔铺路，脚踩上去软软的',x:468, y:440, type:'moss',  emoji:'🍀', color:'#7AAB6A' },
  { id:'8', name:'枫香湾', distance:'4km',  description:'秋天整座山都是红色',     x:728, y:382, type:'maple', emoji:'🍁', color:'#C84B36' },
];

const PARKS_DETAIL = {
  '1': { name:'松风林', description:'松树与风的对话，最适合深呼吸', longDesc:'这片松林拥有超过百年历史的老松树，清晨薄雾笼罩时，光线穿透松针形成完美的光柱。松鼠在这里不怕人，偶尔还会在你脚边讨橡果吃。', distance:'450m', openTime:'全天开放', features:['百年松树','晨雾光柱','松鼠常客','软地草坪'], mood:'深呼吸系', image:'https://images.unsplash.com/photo-1772196118216-5dc72a84e249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'🌲', tips:[{id:'t1',user:'蜗牛旅人',content:'早上6点来，松鼠会来吃松果，超级治愈！',animal:'🐿️',rotation:-2},{id:'t2',user:'赤脚行者',content:'有一片特别软的草地在北角，适合脱鞋踩土',animal:'🦔',rotation:1.5},{id:'t3',user:'深林听者',content:'闭上眼睛能听到至少8种不同的鸟叫',animal:'🐦',rotation:-1.2},{id:'t4',user:'晨光收集者',content:'7点半的光最好，带个相机来',animal:'🦋',rotation:2}] },
  '2': { name:'翠竹园', description:'雨后竹香，最适合深呼吸', longDesc:'一片密集的毛竹林，雨后走进来，整个世界都是翠绿色的。风吹过时竹叶沙沙作响，像是自然界最好的白噪音。', distance:'1.2km', openTime:'6:00 – 22:00', features:['密竹林','天然白噪音','雨后竹香','竹荫步道'], mood:'禅意系', image:'https://images.unsplash.com/photo-1659431246325-52dad0c83dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'🎋', tips:[{id:'t1',user:'雨天散步者',content:'下小雨的时候来最好，竹叶滴水声太治愈了',animal:'🐸',rotation:1},{id:'t2',user:'禅坐爱好者',content:'林子中间有块大石头，可以坐着发呆一整午',animal:'🐛',rotation:-2},{id:'t3',user:'空气品尝家',content:'深吸一口，真的能感觉到不一样',animal:'🦎',rotation:1.8}] },
  '3': { name:'蕨叶谷', description:'蕨叶遮天，宛如侏罗纪', longDesc:'一个被大型蕨类植物覆盖的幽谷，走进去像走进了史前森林。夏天特别凉爽，蕨叶下隐藏着无数小虫子的世界。', distance:'2.1km', openTime:'全天开放', features:['大型蕨类','自然降温','昆虫观察','幽谷步道'], mood:'探秘系', image:'https://images.unsplash.com/photo-1591023626854-371730a148e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'🌿', tips:[{id:'t1',user:'蕨叶观察员',content:'蹲下来看蕨叶底部，住着好多小虫子！',animal:'🐌',rotation:-1.5},{id:'t2',user:'夏日避暑客',content:'夏天比外面凉快5度，带午饭来野餐吧',animal:'🦗',rotation:2.2}] },
  '4': { name:'溪边林', description:'溪水声声，最好脱鞋感受', longDesc:'一条小溪贯穿整片林子，水声叮咚，清澈见底。溪边有圆滑的石头，可以踩水，也可以坐着听溪声发呆。', distance:'860m', openTime:'全天开放', features:['清澈小溪','可踩水','溪边石头','鱼儿可见'], mood:'水元素系', image:'https://images.unsplash.com/photo-1579833472711-fd404a240be7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'💧', tips:[{id:'t1',user:'踩水达人',content:'夏天脱鞋踩溪水，10分钟让你整个人清醒！',animal:'🐟',rotation:1.2},{id:'t2',user:'溪石收藏家',content:'溪边有很多形状有趣的石头，可以带一块回家',animal:'🦀',rotation:-2.5},{id:'t3',user:'水声录音师',content:'在大石头上闭眼听水声，三分钟就能放空',animal:'🐢',rotation:0.8}] },
  '5': { name:'橡果坡', description:'秋天橡果满地，松鼠的天堂', longDesc:'一片橡树林覆盖的缓坡，秋天橡果满地，松鼠在树间跳来跳去。适合带孩子来，也适合自己来找童心。', distance:'1.5km', openTime:'全天开放', features:['大片橡树','松鼠群落','秋季橡果','缓坡草地'], mood:'童趣系', image:'https://images.unsplash.com/photo-1737449149992-d515c4801f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'🌳', tips:[{id:'t1',user:'橡果收集者',content:'秋天来这里捡橡果，一个下午收获满满',animal:'🐿️',rotation:-1.8},{id:'t2',user:'坡顶观景者',content:'爬到坡顶能看到整座城市，很值得',animal:'🦉',rotation:2.5}] },
  '6': { name:'鸟鸣谷', description:'清晨鸟声立体环绕，天然音乐厅', longDesc:'一个天然的凹地地形，形成完美的声学空间。清晨来这里，鸟声从四面八方传来，像置身于立体声音乐厅。', distance:'3.2km', openTime:'全天开放', features:['立体鸟声','天然音效','清晨最佳','蝴蝶常客'], mood:'音乐系', image:'https://images.unsplash.com/photo-1759754119817-ff5094560f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'🐦', tips:[{id:'t1',user:'清晨5点钟',content:'5:30来，鸟合唱开始，整个谷子都在震动',animal:'🦜',rotation:-1},{id:'t2',user:'蝴蝶追随者',content:'夏天有好多种蝴蝶，别带网！只带眼睛',animal:'🦋',rotation:2}] },
  '7': { name:'苔藓小径', description:'绿苔铺路，脚踩上去软软的', longDesc:'一条被柔软苔藓覆盖的小径，潮湿阴凉，脚踩上去有轻轻的弹力感。这里的空气格外清新，负离子含量极高。', distance:'2.5km', openTime:'全天开放', features:['苔藓覆盖','空气清新','阴凉小道','菌菇常见'], mood:'治愈系', image:'https://images.unsplash.com/photo-1591023626854-371730a148e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'🍀', tips:[{id:'t1',user:'苔藓研究者',content:'用手指轻轻摸苔藓，软绵绵的，超级放松',animal:'🐛',rotation:1.5},{id:'t2',user:'菌菇观察家',content:'雨后会长出好多小蘑菇！记得不要摘',animal:'🍄',rotation:-2},{id:'t3',user:'负离子爱好者',content:'深呼吸，能感觉到空气特别甜',animal:'🐜',rotation:0.5}] },
  '8': { name:'枫香湾', description:'秋天整座山都是红色', longDesc:'整片山坡覆盖着枫树，秋天来临时红叶铺满山路，走在其中就像走进了一幅水彩画。是全年最值得来一次的地方。', distance:'4km', openTime:'全天开放', features:['枫树林','秋季红叶','山坡步道','晚霞绝景'], mood:'浪漫系', image:'https://images.unsplash.com/photo-1737449149992-d515c4801f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', emoji:'🍁', tips:[{id:'t1',user:'红叶摄影师',content:'10月底到11月初来，红叶最盛！',animal:'🦔',rotation:-1.5},{id:'t2',user:'夕阳等待者',content:'傍晚5点站在山顶，夕阳+红叶，会哭的',animal:'🦅',rotation:2.2},{id:'t3',user:'落叶收藏家',content:'带一张白纸，把最美的叶子当书签',animal:'🐝',rotation:-0.8}] },
};

const GUIDE_SVGS = {
  snail: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="38" cy="36" r="18" fill="#F4C2C2" opacity=".7"/>
    <circle cx="38" cy="36" r="13" fill="none" stroke="#A68A6B" stroke-width="1.5"/>
    <circle cx="38" cy="36" r="8" fill="none" stroke="#A68A6B" stroke-width="1.2"/>
    <circle cx="38" cy="36" r="3" fill="#A68A6B" opacity=".5"/>
    <path d="M22 44 Q14 44 12 38 Q10 30 20 28 Q30 26 38 32" stroke="#A68A6B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="14" cy="40" rx="5" ry="4" fill="#F7E3AF"/>
    <line x1="12" y1="28" x2="8" y2="22" stroke="#A68A6B" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="16" y1="26" x2="14" y2="19" stroke="#A68A6B" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="8" cy="21" r="2" fill="#5B8C74"/>
    <circle cx="14" cy="18" r="2" fill="#5B8C74"/>
  </svg>`,

  koala: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="42" y="20" width="6" height="38" rx="3" fill="#A68A6B" opacity=".6"/>
    <ellipse cx="45" cy="22" rx="10" ry="12" fill="#5B8C74" opacity=".5"/>
    <ellipse cx="30" cy="42" rx="12" ry="14" fill="#C8C0B8"/>
    <circle cx="30" cy="26" r="12" fill="#C8C0B8"/>
    <circle cx="19" cy="17" r="7" fill="#C8C0B8"/>
    <circle cx="19" cy="17" r="4" fill="#F4C2C2" opacity=".7"/>
    <circle cx="41" cy="17" r="7" fill="#C8C0B8"/>
    <circle cx="41" cy="17" r="4" fill="#F4C2C2" opacity=".7"/>
    <ellipse cx="30" cy="29" rx="5" ry="3.5" fill="#A68A6B" opacity=".7"/>
    <circle cx="25" cy="24" r="2.5" fill="#5B8C74"/>
    <circle cx="35" cy="24" r="2.5" fill="#5B8C74"/>
    <circle cx="26" cy="23" r="1" fill="white"/>
    <circle cx="36" cy="23" r="1" fill="white"/>
    <path d="M38 38 Q46 35 47 40 Q48 45 42 47" stroke="#C8C0B8" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`,

  barefoot: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M20 50 Q18 35 22 20 Q28 12 34 20 Q38 26 36 40 Q34 50 30 52 Q24 54 20 50Z" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.5"/>
    <ellipse cx="22" cy="19" rx="3.5" ry="4" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.2"/>
    <ellipse cx="27" cy="15" rx="3.5" ry="4.5" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.2"/>
    <ellipse cx="33" cy="16" rx="3" ry="4" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.2"/>
    <ellipse cx="38" cy="19" rx="3" ry="3.5" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.2"/>
    <ellipse cx="42" cy="23" rx="2.5" ry="3" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.2"/>
    <path d="M12 56 Q14 48 16 56" stroke="#5B8C74" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M30 58 Q32 50 34 58" stroke="#5B8C74" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M44 56 Q46 48 48 56" stroke="#5B8C74" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  telescope: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="26" width="35" height="14" rx="7" fill="#A68A6B" opacity=".8" transform="rotate(-20 27 33)"/>
    <rect x="8" y="24" width="28" height="14" rx="7" fill="#5B8C74" opacity=".7" transform="rotate(-20 22 31)"/>
    <ellipse cx="10" cy="30" rx="5" ry="8" fill="#FDFBF7" stroke="#A68A6B" stroke-width="1.5" transform="rotate(-20 10 30)"/>
    <ellipse cx="44" cy="22" rx="4" ry="6" fill="#A68A6B" transform="rotate(-20 44 22)"/>
    <line x1="28" y1="40" x2="20" y2="58" stroke="#A68A6B" stroke-width="2" stroke-linecap="round"/>
    <line x1="28" y1="40" x2="36" y2="58" stroke="#A68A6B" stroke-width="2" stroke-linecap="round"/>
    <line x1="28" y1="40" x2="28" y2="58" stroke="#A68A6B" stroke-width="2" stroke-linecap="round"/>
    <circle cx="55" cy="14" r="3" fill="#F7E3AF"/>
  </svg>`,

  basket: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M20 32 Q20 14 32 14 Q44 14 44 32" stroke="#A68A6B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M10 34 Q12 52 32 52 Q52 52 54 34 L10 34Z" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.5"/>
    <path d="M11 38 Q32 36 53 38" stroke="#A68A6B" stroke-width="1" opacity=".5" fill="none"/>
    <path d="M12 42 Q32 40 52 42" stroke="#A68A6B" stroke-width="1" opacity=".5" fill="none"/>
    <path d="M14 46 Q32 44 50 46" stroke="#A68A6B" stroke-width="1" opacity=".5" fill="none"/>
    <circle cx="26" cy="30" r="4" fill="#F4C2C2" opacity=".8"/>
    <circle cx="43" cy="30" r="3" fill="#F7E3AF" stroke="#A68A6B" stroke-width=".8"/>
  </svg>`,

  ear: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M32 8 Q48 8 50 28 Q52 44 42 52 Q38 56 34 52 Q30 48 32 44 Q34 40 38 38 Q44 34 44 28 Q44 18 32 18 Q20 18 20 28 Q20 36 26 40 Q30 44 28 52 Q26 56 22 54 Q14 48 14 28 Q14 8 32 8Z" fill="#F7E3AF" stroke="#A68A6B" stroke-width="1.8"/>
    <path d="M32 22 Q40 22 40 28 Q40 34 36 36" stroke="#A68A6B" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M54 20 Q58 24 58 30 Q58 36 54 40" stroke="#5B8C74" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/>
    <text x="48" y="18" font-size="10" fill="#5B8C74" opacity=".6">♪</text>
    <text x="54" y="46" font-size="8" fill="#5B8C74" opacity=".5">♫</text>
  </svg>`,
};

const GUIDES = [
  { id:1, title:'五感慢行法',   description:'试着只关注一种感官走100步。先是耳朵，然后是鼻子，再是皮肤。让每一步都变得不一样。', svg:'snail',     tag:'🐌 蜗牛速度', color:'#F4C2C2', time:'约15分钟' },
  { id:2, title:'考拉抱树法',   description:'找一棵大树，用整个身体贴住它。感受树皮的纹理、树的温度，想象自己是一只考拉。',       svg:'koala',     tag:'🐨 能量充电', color:'#C8E6C9', time:'约5分钟' },
  { id:3, title:'赤脚接地法',   description:'脱下鞋子，感受土地的温度。找一片软土或草地，慢慢踩下去，把重量交给地面。',           svg:'barefoot',  tag:'🌱 地气充足', color:'#F7E3AF', time:'随时随地' },
  { id:4, title:'望远镜法',     description:'找到最远处的树冠，慢慢靠近它。不是快走，是让目光牵引脚步，忘记时间。',               svg:'telescope', tag:'🔭 目标漫游', color:'#B3E5FC', time:'约30分钟' },
  { id:5, title:'自然采集法',   description:'只捡起能装进口袋的东西：一片落叶、一颗橡果、一块有趣的石头。带走自然的小礼物。',   svg:'basket',    tag:'🧺 随手收藏', color:'#DCEDC8', time:'全程皆可' },
  { id:6, title:'声景倾听法',   description:'闭上眼睛，数出三种不同的声音。风声算一种，但鸟声的每一种都算不同。静听，不评判。',   svg:'ear',       tag:'👂 声音地图', color:'#E1BEE7', time:'约10分钟' },
];
