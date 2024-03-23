export default {
  containerId: 'viz',
  neo4j: {
    // serverUrl: 'bolt://172.20.137.140:7687',
    serverUrl: 'bolt://112.64.134.154:30042',
    serverUser: 'neo4j',
    serverPassword: '123456'
  },
  labels: {
    // 可以配置样式 但是设置无效
    // 食物图数据节点
    third_level_food: {
      label: 'name',
      font: { size: 20 }, // 节点字体大小
      size: 100, // 节点大小
      color: '#EE2233' // 节点颜色
    },
    Check: {
      label: 'name'
    },
    Disease: {
      label: 'name'
    },
    Drug: {
      label: 'name'
    },
    Food: {
      label: 'name'
    },
    Symptom: {
      label: 'name'
    },
    amino_acid: {
      label: 'name'
    },
    base_nutrition: {
      label: 'name'
    },
    effect: {
      label: 'name'
    },
    first_level_food: {
      label: 'name'
    },
    lipid: {
      label: 'name'
    },
    minerals: {
      label: 'name'
    },
    second_level_food: {
      label: 'name'
    },
    vitamin: {
      label: 'name'
    }
  },
  relationships: {
    HasEffect: {
    },
    HasFirstSubFood: {
    },
    HasSecondSubFood: {
    },
    acompany_with: {
    },
    belongs_to: {
      label: 'name'
    },
    common_drug: {
      label: 'name'
    },
    do_eat: {
      label: 'name'
    },
    drugs_of: {
      label: 'name'
    },
    has_symptom: {
      label: 'name'
    },
    need_check: {
      label: 'name'
    },
    no_eat: {
      label: 'name'
    },
    recommand_drug: {
      label: 'name'
    },
    recommand_eat: {
      label: 'name'
    }
  },
  arrows: true,
  initialCypher: 'MATCH p=()-[r:do_eat]->() RETURN p LIMIT 25',
  option: [
    {
      value: 'MATCH (n:Food) RETURN n LIMIT 25',
      label: '检索前25个食物节点'
    },
    {
      value: 'MATCH p=()-[r:`亮氨酸`]->() RETURN p LIMIT 25',
      label: '检索含有亮氨酸的前25个关系节点'
    },
    {
      value: 'MATCH p=()-[r:HasEffect]->() RETURN p LIMIT 100',
      label: '小麦胚粉影响的前25个疾病'
    },
    {
      value: 'MATCH p=()-[r:need_check]->() RETURN p LIMIT 25',
      label: '需要做哪些检查'
    },
    {
      value: 'MATCH p=()-[r:acompany_with]->() RETURN p LIMIT 100',
      label: '疾病的并发症的前100条'
    },
    {
      value: 'MATCH p=()-[r:acompany_with]->() RETURN p LIMIT 100',
      label: '疾病适合吃什么前100条'
    },
    {
      value: 'MATCH p=()-[r:recommand_eat]->() RETURN p LIMIT 100',
      label: '推荐吃的食物100条'
    },
    {
      value: 'MATCH p=()-[r:recommand_drug]->() RETURN p LIMIT 100',
      label: '推荐药物前100条'
    },
    {
      value: 'MATCH p=()-[r:recommand_drug]->() RETURN p LIMIT 100',
      label: '疾病的症状前100条'
    },
    {
      value: 'MATCH p=()-[r:`维生素D`]->() RETURN p LIMIT 100',
      label: '含有维生素D的食物前100条'
    },
    {
      value: 'MATCH p=()-[r:`维生素A`]->() RETURN p LIMIT 100',
      label: '含有维生素A的食物前100条'
    },
    {
      value: 'MATCH p=()-[r:`番茄红素`]->() RETURN p LIMIT 100',
      label: '含有番茄红素的食物前100条'
    }
  ]
}
