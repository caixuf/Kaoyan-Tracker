// 考研英语核心词根词缀与高频真题卡片库 (自包含无需外链)

const ENGLISH_VOCAB_CARDS = [
  {
    id: "v_sub",
    root: "sub- / suc- / suf- / sug-",
    meaning: "under, below, secondary (在…下面，次要，接近)",
    examples: [
      { word: "subconscious", pos: "adj.", def: "潜意识的", sentence: "Subconscious desires often manifest in dreams." },
      { word: "submit", pos: "v.", def: "屈服；提交", sentence: "Applicants must submit their forms before the deadline." },
      { word: "subsequent", pos: "adj.", def: "随后的，后来的", sentence: "Subsequent events proved that the hypothesis was correct." },
      { word: "subsidize", pos: "v.", def: "资助，津贴", sentence: "The government decided to subsidize green energy research." }
    ]
  },
  {
    id: "v_trans",
    root: "trans- / tra-",
    meaning: "across, through, beyond (横过，穿过，转变)",
    examples: [
      { word: "transform", pos: "v.", def: "改变，变换", sentence: "Artificial Intelligence will transform modern industries." },
      { word: "transient", pos: "adj.", def: "短暂的，转瞬即逝的", sentence: "Wealth and fame are often transient in life." },
      { word: "transparent", pos: "adj.", def: "透明的；坦率的", sentence: "The decision-making process must remain fully transparent." },
      { word: "transcend", pos: "v.", def: "超越，胜过", sentence: "Great art transcends national and cultural boundaries." }
    ]
  },
  {
    id: "v_tract",
    root: "tract-",
    meaning: "draw, pull, drag (拉，引，拽)",
    examples: [
      { word: "abstract", pos: "adj./n.", def: "抽象的；摘要", sentence: "Mathematics deals with abstract logical structures." },
      { word: "distract", pos: "v.", def: "分散注意力", sentence: "Smartphones can easily distract students from studying." },
      { word: "extract", pos: "v./n.", def: "提取；榨出", sentence: "Scientists managed to extract DNA from ancient fossils." },
      { word: "retract", pos: "v.", def: "撤回，缩回", sentence: "The journal decided to retract the flawed paper." }
    ]
  },
  {
    id: "v_spect",
    root: "spec- / spect- / spic-",
    meaning: "look, see, view (看，观察，视线)",
    examples: [
      { word: "retrospect", pos: "n./v.", def: "回顾，追溯", sentence: "In retrospect, that failure was a crucial learning experience." },
      { word: "perspective", pos: "n.", def: "视角，远景，透视", sentence: "Reading diverse literature offers a broader perspective." },
      { word: "spectacular", pos: "adj.", def: "壮观的，引人注目的", sentence: "The sunrise over the snow mountain was spectacular." },
      { word: "conspicuous", pos: "adj.", def: "显眼的，显著的", sentence: "There was a conspicuous absence of evidence." }
    ]
  },
  {
    id: "v_cred",
    root: "cred- / creed-",
    meaning: "believe, trust (相信，信任)",
    examples: [
      { word: "credible", pos: "adj.", def: "可信的，可靠的", sentence: "We need credible sources to support our scientific claims." },
      { word: "credential", pos: "n.", def: "证书，凭证，资历", sentence: "Academic credentials alone do not guarantee practical success." },
      { word: "incredible", pos: "adj.", def: "难以置信的，极好的", sentence: "The human brain has an incredible capacity for memory." }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ENGLISH_VOCAB_CARDS };
}
