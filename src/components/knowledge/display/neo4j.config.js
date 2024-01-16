export default {
  containerId: 'viz',
  neo4j: {
    serverUrl: 'bolt://172.20.137.140:7687',
    serverUser: 'neo4j',
    // serverPassword: "sorts-swims-burglaries",
    serverPassword: '123456'
  },
  labels: {
    Department: {
      label: 'name',
      // community: "community",
      group: 'name'
      // font: { size: 20 }, // 节点字体大小
      // size: 100,           // 节点大小
      // color: '#EE2233'    // 节点颜色
    },
    Producer: {
      label: 'name', // 对应数据库中的名字
      // caption: "name",
      community: 'name',
      size: 200,
      font: {
        size: 100,
        color: '#DA7194'
      }
    },
    // 食物图数据节点
    third_level_food: {
      label: 'name'
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
  initialCypher: 'MATCH p=()-[r:do_eat]->() RETURN p LIMIT 25'
}
