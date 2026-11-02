const projects = {
  "magwitch-workshop": {
    index: "CASE 01",
    title: "魔女的怪物工坊｜生态能量转换与关卡系统",
    subtitle: "独立游戏案例 · 创意与 AI 协作",
    period: "独立项目",
    role: "创意与美术",
    scope: "玩法概念 / 视觉方向 / 能量体系 / 关卡结构",
    summary:
      "一款可离线游玩的 H5 生态布局解谜。玩家摆放小怪物，让水分、阳光和孢子沿相邻格传递，并通过固定点结算完成目标。本人负责玩法概念、视觉方向、怪物与目标体系及内容结构；AI 负责代码实现、关卡生成与自动化验证。",
    tags: ["生态能量转换", "固定点结算", "5 章 50 关", "反向构造关卡", "穷举求解验证"],
    contextTitle: "项目背景",
    context: [
      "项目以“生态布局”为核心：玩家需要理解不同怪物的能量传播方向，通过相邻格关系组合出花朵、孢子芽、水晶和余烬花所需的条件。",
      "内容规划为 5 章 50 关，从水分与阳光入门，逐步加入孢子、能量转换和多链综合挑战。50 关是内容结构规划，不代表全部由本人手动搭建或逐关验证。"
    ],
    responsibilities: [
      "提出生态能量转换玩法、怪物能力关系与关卡目标的核心概念。",
      "确立视觉方向、怪物形象、目标物与能量符号的表达方式。",
      "规划 5 章 50 关的内容结构和难度递进。",
      "以固定点结算为前提梳理同时结算规则，让动画顺序不影响结果。",
      "参与反向构造关卡与结果合理性判断；编程、求解器实现和自动化验证由 AI 执行。"
    ],
    loop: [
      ["01", "观察目标", "识别所需水、阳光与孢子"],
      ["02", "放置怪物", "组合方向与相邻格关系"],
      ["03", "开始观察", "所有能力同时结算"],
      ["04", "形成能量链", "持续传播直到状态稳定"],
      ["05", "调整布局", "让目标物满足生长条件"]
    ],
    decisionsTitle: "关键设计判断",
    decisions: [
      "能力必须同时结算，否则动画顺序会改变玩家对规则的理解。",
      "不同能量需要稳定的视觉语言，让玩家能从怪物和轨迹预测传播方向。",
      "AI 用反向构造生成候选关卡并穷举检查合法性，人负责规则目标、审美与内容节奏判断。"
    ],
    resultsTitle: "协作与验证",
    results: [
      ["内容结构", "规划 5 章 50 关，按生态机制逐层增加复杂度。"],
      ["验证方式", "AI 穷举检查当前 50 关均至少存在一个合法解。"],
      ["协作边界", "本人负责创意与美术；AI 负责代码、关卡生成与自动化验证。"],
      ["成品形态", "可离线游玩的 H5 原型，包含地图、提示、撤销和自动存档。"]
    ],
    note: "说明：本项目采用人机协作流程。页面不把编程、求解器实现或全部关卡制作归为本人个人工程成果，5 章 50 关为规划内容结构。"
  },
  bifan: {
    index: "CASE 02",
    title: "《向往的生活》｜剪刀道具合并与拆分优化",
    subtitle: "必凡互娱 · 官方授权二合手游项目组",
    period: "2026.01—2026.04",
    role: "系统策划实习生",
    scope: "道具规则 / 状态机制 / 经济复盘",
    summary:
      "围绕剪刀道具的合并、拆分与多级状态管理，梳理可实现的前后端规则；通过 N-1 母体重置机制降低异常状态复杂度，并结合合成经济、订单产出、体力预算和 A/B 复盘持续观察体验变化。",
    tags: ["二合休闲", "道具规则", "N-1 状态重置", "数值经济", "A/B 复盘"],
    contextTitle: "项目背景",
    context: [
      "项目需要让玩家通过剪刀对多级道具进行合并与拆分，同时保证道具来源、资源返还、母体状态和订单产出之间不会互相冲突。",
      "我独立负责“剪刀道具合并与拆分优化案”，主导需求评审并对齐前后端逻辑，把复杂状态变化整理成可执行规则。"
    ],
    responsibilities: [
      "梳理剪刀道具在合并、拆分、消耗和返还过程中的状态变化，明确不同操作路径下的唯一结果。",
      "设计 N-1 母体状态重置机制，处理多级道具在订单提交、资源变化和异常中断后的状态恢复问题。",
      "从合成经济、订单产出和体力预算出发，分析玩家的资源循环与策略取舍。",
      "参与礼包推送与 A/B 测试复盘，根据付费阈值调整策略并观察 ARPU 等指标，但不在公开页面披露项目内部数据。"
    ],
    loop: [
      ["01", "获得道具", "订单与关卡产出"],
      ["02", "合并或拆分", "剪刀改变状态"],
      ["03", "完成订单", "资源转化为目标"],
      ["04", "消耗与成长", "体力、金币和等级"],
      ["05", "产生新目标", "回到下一轮循环"]
    ],
    decisionsTitle: "关键设计判断",
    decisions: [
      "优先级最高的不是增加规则数量，而是确保任何路径都能推导出一致状态。",
      "N-1 重置机制用于收敛复杂母体状态，让前后端对“下一步该显示和返还什么”有统一答案。",
      "经济复盘需要同时看产出、消耗、订单动力与礼包触达，避免只盯单一指标做局部调整。"
    ],
    resultsTitle: "交付与结果",
    results: [
      ["功能推进", "主导需求评审并对齐前后端，推动合并与拆分功能上线。"],
      ["规则资产", "输出可执行状态规则、竞品拆解与需求文档。"],
      ["数据方法", "形成礼包推送和 A/B 复盘的分析框架。"]
    ],
    note: "说明：该案例只展示公开可表述的工作方法、系统逻辑与个人职责，不包含项目内部数值、用户数据或商业机密。"
  },
  "smiling-shell": {
    index: "CASE 03",
    title: "SMILING SHELL｜面具悖论",
    subtitle: "2026 Global Game Jam · 48 小时限时开发",
    period: "2026.01",
    role: "玩法策划 / 美术",
    scope: "核心机制 / 迷宫引导 / 视觉方案",
    summary:
      "在 48 小时 GameJam 中设计“面具”带来的风险收益选择：不戴面具可以恢复体力，但缺少方向；戴面具能发现隐藏线索和出口，却持续消耗体力并累积同化值。",
    tags: ["GameJam", "风险收益", "资源压力", "迷宫引导", "手绘视觉"],
    contextTitle: "设计命题",
    context: [
      "主题是 MASK。团队希望把面具做成不断要求玩家重新权衡的资源开关，而不是一次性的装扮或单纯增益。",
      "玩家在可逆与不可逆状态之间来回选择：安全探索会变慢，掌握信息则要承受逐渐累积的代价。"
    ],
    responsibilities: [
      "设计“面具悖论”核心玩法，让体力、方向信息与同化值形成互相牵制的资源关系。",
      "参与迷宫结构、距离排序箭头和信息可见性方案，让环境承担部分引导。",
      "负责手绘涂鸦视觉方向，把面具状态、路径线索和危险反馈统一到同一套表达中。",
      "在 48 小时内完成机制文档、功能优先级和可玩 Demo 的交付协作。"
    ],
    loop: [
      ["01", "判断环境", "是否需要方向信息"],
      ["02", "决定戴面具", "获得线索但承担消耗"],
      ["03", "探索迷宫", "按箭头和信息前进"],
      ["04", "管理压力", "体力与同化值变化"],
      ["05", "主动摘下面具", "恢复体力并接受不确定"]
    ],
    decisionsTitle: "关键设计判断",
    decisions: [
      "机制必须让玩家感到“信息不是免费的”，所以面具收益和代价需要同时可见。",
      "同化值保持渐进式压力，让风险来自持续选择，而不是突然失败。",
      "迷宫引导使用距离顺序与视觉涂鸦组合，减少用文字直接告诉玩家答案。"
    ],
    resultsTitle: "48 小时交付",
    results: [
      ["机制闭环", "完成面具开启、消耗、线索获取与摘除恢复的核心循环。"],
      ["视觉系统", "建立手绘涂鸦、箭头与面具状态反馈。"],
      ["可玩原型", "完成从机制设计到 Demo 交付的限时协作。"]
    ],
    note: "说明：GameJam 项目以原型验证和学习协作为主，不等同于商业产品最终品质。"
  },
  "robot-doctor": {
    index: "CASE 04",
    title: "ROBOT 医生模拟器",
    subtitle: "2025 聚光灯 GameJam · 9 人团队",
    period: "2025.10—2025.11",
    role: "主策划",
    scope: "玩法融合 / 关卡搭建 / 节奏调整",
    summary:
      "与 9 人团队把视觉小说、调药玩法和 2D 平台跳跃整合成完整短流程。负责核心玩法拆解、Unity ProBuilder 关卡搭建、节奏与难度调整，并参与原型调试和限时交付。",
    tags: ["主策划", "玩法融合", "2D 平台跳跃", "Unity ProBuilder", "团队协作"],
    contextTitle: "项目目标",
    context: [
      "项目难点不是单独做好某个玩法，而是让文字叙事、调药交互和平台跳跃在同一个短流程里互相服务。",
      "团队希望玩家在前段理解角色与问题，在中段通过调药做出判断，在后段用平台操作把结果转化为紧张体验。"
    ],
    responsibilities: [
      "拆解三类玩法的共同目标，定义每个阶段的玩家任务、反馈和转场条件。",
      "负责 Unity ProBuilder 关卡搭建，调整平台距离、危险点、检查点和节奏变化。",
      "参与核心循环与难度曲线设计，确保玩家先理解规则，再面对组合压力。",
      "使用 GPT 辅助验证 Unity 脚本后由本人修改、调试和测试，提高原型迭代效率。"
    ],
    loop: [
      ["01", "阅读案例", "理解患者问题"],
      ["02", "判断配方", "选择药物与剂量"],
      ["03", "进入平台", "用操作完成治疗"],
      ["04", "接受反馈", "结果影响叙事推进"],
      ["05", "进入下一例", "难度与组合升级"]
    ],
    decisionsTitle: "关键设计判断",
    decisions: [
      "叙事阶段负责建立动机，平台阶段负责把判断变成可感知的压力。",
      "关卡先教单个动作，再组合危险点，避免在玩家理解不足时堆叠难度。",
      "所有玩法都围绕“机器人医生处理病例”这一统一情境，不让交互变成互不相关的模块。"
    ],
    resultsTitle: "团队交付",
    results: [
      ["完整短流程", "打通视觉小说、调药玩法和平台跳跃。"],
      ["关卡节奏", "完成可玩关卡搭建、检查点与难度调整。"],
      ["协作推进", "在限时条件下完成跨职能协调和原型调试。"]
    ],
    note: "说明：该案例展示 GameJam 团队协作与原型制作过程，不代表商业项目上线结果。"
  },
  "godot-merge": {
    index: "CASE 05",
    title: "Godot 二合 Demo｜完整核心循环",
    subtitle: "个人原型 · Godot / GDScript",
    period: "个人项目",
    role: "独立设计与开发",
    scope: "系统原型 / 交互反馈 / 经济基础",
    summary:
      "独立完成生成、拖拽、合成和订单提交的完整闭环，实现槽位查找、合成生成、体力与订单经济，并通过动画和粒子反馈改善操作手感。",
    tags: ["Godot", "GDScript", "核心循环", "槽位系统", "体力经济"],
    contextTitle: "原型目标",
    context: [
      "原型用于验证二合玩法从“生成道具”到“提交订单”的最短闭环，重点不是页面数量，而是规则能否持续产生下一步目标。",
      "我同时承担系统设计、脚本实现、数值配置和交互反馈，确保每个设计判断都可以在原型里被直接测试。"
    ],
    responsibilities: [
      "独立完成生成、拖拽、合成和订单提交的核心循环。",
      "实现槽位查找与合成生成逻辑，保证道具等级和空位判定稳定。",
      "搭建体力与订单经济，控制单次操作成本和下一订单的动力。",
      "通过动画、粒子和即时反馈优化拖拽与合成手感。"
    ],
    loop: [
      ["01", "生成道具", "进入棋盘槽位"],
      ["02", "拖拽合并", "相同等级合成升级"],
      ["03", "满足订单", "消耗指定道具"],
      ["04", "获得资源", "金币与成长反馈"],
      ["05", "刷新目标", "产生下一订单"]
    ],
    decisionsTitle: "关键设计判断",
    decisions: [
      "槽位搜索与合并规则先保证可预测，再增加视觉和音效反馈。",
      "订单需求遵循等级组合，避免生成完全无法完成的死局。",
      "体力系统用于给操作节奏加边界，但不能先于核心乐趣形成强阻塞。"
    ],
    resultsTitle: "原型产出",
    results: [
      ["核心闭环", "生成、拖拽、合成与订单提交可完整运行。"],
      ["经济基础", "体力与订单产出形成可调整的参数框架。"],
      ["操作反馈", "动画和粒子增强合成与提交的完成感。"]
    ],
    note: "说明：该项目为个人学习和原型验证，不包含第三方商业素材或未授权内容。"
  },
  "art-ui": {
    index: "CASE 06",
    title: "游戏美术与 UI｜古城 VR × 名医巡礼",
    subtitle: "3D 美术、2D 美术与 UI 项目合集",
    period: "2023.01—2024.10",
    role: "3D 美术 / 2D 美术与 UI",
    scope: "Unity 资产管线 / 场景表现 / 界面系统",
    summary:
      "参与《数智古城》VR 文化游戏和《神医游踪，千古名医巡礼》的视觉制作，覆盖古建筑建模、UV、Substance 贴图、Unity 资产管线、2D 角色立绘、场景地图、主菜单、背包和对话框。",
    tags: ["Unity", "Maya", "Substance", "Spine", "2D UI", "VR 交互"],
    contextTitle: "项目分工",
    context: [
      "《数智古城》需要兼顾古建筑细节、VR 性能和 Unity 内资产组织；《神医游踪》则需要统一角色、场景与 UI 的视觉语言。",
      "我的工作横跨 3D 与 2D，重点是把美术资产做到可落地、可复用，并配合程序完成显示与状态跳转。"
    ],
    responsibilities: [
      "负责古建筑建模、UV、Substance 贴图和 Unity 资产管线。",
      "处理 LOD 与 Lightmap，配合程序调试 VR 交互与碰撞。",
      "确立《神医游踪》的游戏美术风格，负责角色立绘、横版场景地图、主菜单、背包和对话框。",
      "配合程序实现 UI 状态跳转与角色动画。"
    ],
    loop: [
      ["01", "风格定义", "确定题材与视觉规则"],
      ["02", "资产制作", "建模、贴图或 2D 绘制"],
      ["03", "进入引擎", "整理层级与交互状态"],
      ["04", "程序联调", "碰撞、UI 跳转与动画"],
      ["05", "性能检查", "LOD、Lightmap 和表现平衡"]
    ],
    decisionsTitle: "关键设计判断",
    decisions: [
      "美术资产不仅要好看，还要适配引擎流程、交互状态和运行性能。",
      "UI 与场景使用同一套色彩、材质和角色语言，避免界面像独立于游戏的外部面板。",
      "VR 场景优先保证可读性和交互反馈，再处理不必要的细节。"
    ],
    resultsTitle: "项目产出",
    results: [
      ["《数智古城》", "完成古建筑资产、贴图、LOD、Lightmap 与 VR 联调。"],
      ["《神医游踪》", "完成角色立绘、横版场景、主菜单、背包和对话框。"],
      ["竞赛荣誉", "2023、2024 连续两年获中国大学生计算机设计大赛游戏赛道国家三等奖。"]
    ],
    note: "说明：页面只展示本人参与的可公开工作内容，不发布未授权原始工程、团队素材或商业文件。"
  }
};

const projectOrder = [
  "magwitch-workshop",
  "bifan",
  "smiling-shell",
  "robot-doctor",
  "godot-merge",
  "art-ui"
];

const homeView = document.querySelector("#home-view");
const projectView = document.querySelector("#project-view");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const yearTarget = document.querySelector("#current-year");
const appViews = [...document.querySelectorAll(".app-view")];
const careerButtons = [...document.querySelectorAll("[data-chapter]")];
const careerDetail = document.querySelector(".career-detail");
const careerStep = document.querySelector("#career-step");
const careerPeriod = document.querySelector("#career-period");
const careerTitle = document.querySelector("#career-title");
const careerCopy = document.querySelector("#career-copy");
const careerTags = document.querySelector("#career-tags");
const careerLink = document.querySelector("#career-link");
const careerLinkLabel = document.querySelector("#career-link-label");
const careerTakeaway = document.querySelector("#career-takeaway");
const careerEvidenceCore = document.querySelector(".evidence-core strong");
const careerEvidenceTags = [...document.querySelectorAll(".career-evidence .evidence-tag")];
const builderButtons = [...document.querySelectorAll("[data-builder-group]")];
const builderResult = document.querySelector("#builder-result");
const builderResultCopy = builderResult?.nextElementSibling;
const projectFilterButtons = [...document.querySelectorAll("[data-project-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-categories]")];

const careerContent = {
  art: {
    step: "STAGE 01",
    period: "2021—2024",
    title: "从视觉开始理解交互",
    copy:
      "数字媒体艺术本科阶段，参与 3D 古建、VR 场景、2D 角色与 UI 制作，开始从视觉和信息反馈理解玩家体验。",
    tags: ["3D / VR", "2D / UI", "交互表达"],
    href: "#/project/art-ui",
    linkLabel: "查看美术与 UI 案例",
    takeaway: "先让视觉信息承担引导，再让玩家自己发现下一步。",
    core: "观察<br>拆解<br>表达",
    evidence: ["建模 / 材质", "角色 / 界面", "引擎落地"]
  },
  degree: {
    step: "STAGE 02",
    period: "2025.09—2027.07",
    title: "把表达欲转成规则意识",
    copy:
      "进入计算机科学与技术第二学位，系统学习数据结构、数据库、操作系统与计算机系统，把“好玩”继续拆成可以验证的结构。",
    tags: ["计算机基础", "逻辑结构", "系统思维"],
    href: "#about",
    linkLabel: "查看完整角色档案",
    takeaway: "系统设计需要同时理解表达目标与实现边界。",
    core: "理解<br>推导<br>验证",
    evidence: ["数据结构", "系统课程", "工程意识"]
  },
  jam: {
    step: "STAGE 03",
    period: "2025.10—2026.01",
    title: "在 48 小时里让玩法成立",
    copy:
      "先后参与 ROBOT 医生模拟器与 SMILING SHELL 两个 GameJam 项目，负责主策划、玩法融合、关卡节奏或核心机制设计。",
    tags: ["主策划", "风险收益", "限时交付"],
    href: "#/project/robot-doctor",
    linkLabel: "打开 ROBOT 医生案例",
    takeaway: "限时原型里，先确定共同目标，再压缩实现范围。",
    core: "组队<br>取舍<br>交付",
    evidence: ["9 人协作", "关卡节奏", "48H 原型"]
  },
  industry: {
    step: "STAGE 04",
    period: "2026.01—2026.04",
    title: "进入真实系统与数据环境",
    copy:
      "在必凡互娱参与官方授权二合手游，负责剪刀道具合并拆分、N-1 状态重置，并从订单、体力与 A/B 复盘中观察真实玩家策略。",
    tags: ["二合系统", "数值经济", "需求评审"],
    href: "#/project/bifan",
    linkLabel: "打开必凡互娱案例",
    takeaway: "真实产品里，规则必须可执行、可验证、可复盘。",
    core: "规则<br>经济<br>复盘",
    evidence: ["状态管理", "订单产出", "A/B 复盘"]
  }
};

document.body.classList.add("js-ready");

if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());

function selectChapter(key) {
  const chapter = careerContent[key];
  if (!chapter) return;

  careerButtons.forEach((button) => {
    const isActive = button.dataset.chapter === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  careerStep.textContent = chapter.step;
  careerPeriod.textContent = chapter.period;
  careerTitle.textContent = chapter.title;
  careerCopy.textContent = chapter.copy;
  careerTags.innerHTML = chapter.tags.map((tag) => `<span>${tag}</span>`).join("");
  careerLink.href = chapter.href;
  careerLinkLabel.textContent = chapter.linkLabel;
  careerTakeaway.textContent = chapter.takeaway;
  careerEvidenceCore.innerHTML = chapter.core;
  careerEvidenceTags.forEach((tag, index) => {
    tag.textContent = chapter.evidence[index];
  });

  careerDetail.classList.remove("is-updating");
  void careerDetail.offsetWidth;
  careerDetail.classList.add("is-updating");
}

careerButtons.forEach((button) => {
  button.addEventListener("click", () => selectChapter(button.dataset.chapter));
});

const builderState = {
  rule: "merge",
  cost: "energy",
  feedback: "growth"
};

const builderMatches = [
  {
    rule: "merge",
    cost: "energy",
    feedback: "growth",
    title: "《向往的生活》二合案例",
    href: "#/project/bifan",
    note: "合并规则、体力代价与成长反馈组成可循环的二合系统。"
  },
  {
    rule: "state",
    cost: "assimilation",
    feedback: "clue",
    title: "SMILING SHELL 风险机制",
    href: "#/project/smiling-shell",
    note: "状态切换让线索成为有代价的资源，风险随持续选择累积。"
  }
];

function updateBuilder() {
  const ranked = [...builderMatches]
    .map((entry) => ({
      entry,
      score: [entry.rule === builderState.rule, entry.cost === builderState.cost, entry.feedback === builderState.feedback].filter(Boolean).length
    }))
    .sort((a, b) => b.score - a.score);
  const match = ranked[0].entry;

  builderResult.textContent = match.title;
  builderResult.href = match.href;
  builderResultCopy.textContent = match.note;
}

builderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.builderGroup;
    builderState[group] = button.dataset.builderValue;
    builderButtons
      .filter((candidate) => candidate.dataset.builderGroup === group)
      .forEach((candidate) => {
        const isSelected = candidate === button;
        candidate.classList.toggle("is-selected", isSelected);
        candidate.setAttribute("aria-pressed", String(isSelected));
      });
    updateBuilder();
  });
});

function filterProjects(filter) {
  projectFilterButtons.forEach((button) => {
    const isActive = button.dataset.projectFilter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  projectCards.forEach((card) => {
    const categories = (card.dataset.projectCategories || "").split(/\s+/);
    card.hidden = filter !== "all" && !categories.includes(filter);
  });
}

projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => filterProjects(button.dataset.projectFilter));
});

function setMenu(open) {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
  siteNav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

function closeMenu() {
  setMenu(false);
}

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

window.addEventListener(
  "scroll",
  () => {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 14);
  },
  { passive: true }
);

function detailLoop(loop) {
  return loop
    .map(
      ([index, title, description]) => `
        <div class="detail-loop-step">
          <span>${index}</span>
          <strong>${title}</strong>
          <small>${description}</small>
        </div>
      `
    )
    .join("");
}

function detailResults(results) {
  return results
    .map(
      ([label, value]) => `
        <div>
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `
    )
    .join("");
}

function renderProject(slug) {
  const project = projects[slug];
  if (!project) return false;

  const previousIndex = projectOrder.indexOf(slug) - 1;
  const nextIndex = projectOrder.indexOf(slug) + 1;
  const previousSlug = previousIndex >= 0 ? projectOrder[previousIndex] : null;
  const nextSlug = nextIndex < projectOrder.length ? projectOrder[nextIndex] : null;
  const nextProject = nextSlug ? projects[nextSlug] : null;
  const previousProject = previousSlug ? projects[previousSlug] : null;

  projectView.innerHTML = `
    <article>
      <header class="project-detail-hero">
        <div class="project-detail-hero-inner">
          <a class="back-link" href="#projects">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m5-5-5 5 5 5" /></svg>
            返回项目列表
          </a>
          <div class="detail-meta">
            <span>${project.index}</span>
            <span>${project.period}</span>
            <span>${project.role}</span>
          </div>
          <h1>${project.title.replace("｜", "<br>")}</h1>
          <p class="detail-summary">${project.summary}</p>
          <div class="detail-tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </div>
      </header>

      <div class="detail-body">
        <aside class="detail-sidebar" aria-label="项目信息">
          <dl>
            <div><dt>项目</dt><dd>${project.subtitle}</dd></div>
            <div><dt>时间</dt><dd>${project.period}</dd></div>
            <div><dt>角色</dt><dd>${project.role}</dd></div>
            <div><dt>范围</dt><dd>${project.scope}</dd></div>
          </dl>
        </aside>

        <div class="detail-main">
          <section class="detail-section">
            <div class="detail-section-header">
              <span>01</span>
              <h2>${project.contextTitle}</h2>
            </div>
            ${project.context.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </section>

          <section class="detail-section">
            <div class="detail-section-header">
              <span>02</span>
              <h2>我负责的工作</h2>
            </div>
            <ul class="detail-list">
              ${project.responsibilities.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>

          <section class="detail-section">
            <div class="detail-section-header">
              <span>03</span>
              <h2>核心循环</h2>
            </div>
            <div class="detail-loop">
              ${detailLoop(project.loop)}
            </div>
          </section>

          <section class="detail-section">
            <div class="detail-section-header">
              <span>04</span>
              <h2>${project.decisionsTitle}</h2>
            </div>
            <ul class="detail-list">
              ${project.decisions.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>

          <section class="detail-section">
            <div class="detail-section-header">
              <span>05</span>
              <h2>${project.resultsTitle}</h2>
            </div>
            <div class="detail-result">
              ${detailResults(project.results)}
            </div>
            <p class="detail-note">${project.note}</p>
          </section>

          <div class="detail-actions">
            <a class="button button-primary" href="#projects">
              返回全部项目
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m5-5-5 5 5 5" /></svg>
            </a>
            ${
              nextProject
                ? `<a class="button button-secondary" href="#/project/${nextSlug}">下一个：${nextProject.title.split("｜")[0]} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></a>`
                : `<a class="button button-secondary" href="#contact">联系我 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></a>`
            }
            ${
              previousProject
                ? `<a class="button button-secondary" href="#/project/${previousSlug}">上一个：${previousProject.title.split("｜")[0]}</a>`
                : ""
            }
          </div>
        </div>
      </div>
    </article>
  `;

  homeView.hidden = true;
  projectView.hidden = false;
  navLinks.forEach((link) => link.classList.remove("is-active"));
  document.querySelector('.site-nav a[data-section="projects"]')?.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "instant" });
  document.title = `${project.title}｜1111号`;
  return true;
}

function showHome(sectionId) {
  homeView.hidden = false;
  projectView.hidden = true;

  appViews.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === sectionId);
  });

  const titles = {
    home: "1111号｜系统策划职业档案",
    projects: "项目｜1111号",
    demo: "系统演示｜1111号",
    about: "成长档案｜1111号",
    content: "创作与社群｜1111号",
    contact: "合作邀请｜1111号"
  };

  document.title = titles[sectionId] || titles.home;
  window.scrollTo({ top: 0, behavior: "auto" });
}

function updateActiveNav(sectionId) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === sectionId);
  });
}

function route() {
  const hash = window.location.hash || "#home";
  const projectMatch = hash.match(/^#\/project\/([a-z0-9-]+)$/i);

  if (projectMatch && renderProject(projectMatch[1])) {
    return;
  }

  const sectionId = hash.replace(/^#/, "") || "home";
  if (["home", "projects", "demo", "about", "content", "contact"].includes(sectionId)) {
    showHome(sectionId);
    updateActiveNav(sectionId);
  } else {
    showHome("home");
    updateActiveNav("home");
  }
}

window.addEventListener("hashchange", route);
route();

const revealElements = [...document.querySelectorAll(".reveal")];

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

window.addEventListener("pageshow", () => {
  if (document.querySelector(".project-view:not([hidden])")) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
});
