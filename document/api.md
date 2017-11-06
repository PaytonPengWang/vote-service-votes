# Vote Service API v1.0

## 创建Vote

### ID
```
V_0100
```

### URI
```
POST /votes
```

### Request Body
```
{
  title : {
    type : String,
    required : true,
    description : 'Vote 标题'
  },
  description : {
    type : String,
    description : 'Vote 的描述信息'
  },
  type : {
    type : Number,
    default : 0,
    description : 'Vote类型，0 - 单选， 1 - 多选'
  },
  endTime : {
    type : Number,
    descriotion : 'Vote结束时间'
  },
  items : [{
    type : String,
    required : true,
    description : 'Vote Item, 至少存在两个item'
  }]
}
```

### Response Body
```
{
  message : "resource created"
}
```

### Response Header
```
Location : /votes/{voteId}
```

## 修改Vote
### ID
```
V_0200
```

### URI
```
PUT /votes/{voteId}
```

### Request Body
```
{
  title : {
    type : String,
    description : 'Vote 标题'
  },
  description : {
    type : String,
    description : 'Vote 的描述信息'
  },
  type : {
    type : Number,
    description : 'Vote类型，0 - 单选， 1 - 多选'
  },
  endTime : {
    type : Number,
    description : 'Vote结束时间'
  },
  items : [{
    type : {String | {
      id : String,
      description : String
    }},
    required : true,
    description : 'Vote Item, 至少存在两个item, Server会检查items,类型为Object的将不管，类型为String的则添加，不存在的则删除'
  }]
}
```

### Response Body
```
{
  message : "resource updated"
}
```

## 发布Vote
### ID
```
V_0200
```

### URI
```
PUT /votes/{voteId}
```

### Request Body
```
{
  actionId : "RELEASE",
  status : 1
}
```

### Response Body
```
{
  message : "resource updated"
}
```

## 删除Vote
### ID
```
V_0300
```

### URI
```
DELETE /votes/{voteId}
```

### Response Body
```
{
  message : "resource deleted"
}
```

## 获取Vote列表
### ID
```
V_0400
```

### URI
```
GET /votes?[status={0|1}]&[voter=true|false]&populate=items

status - null : 全部
status - 0 : 未发布
status - 1 : 已发布

voter - null|false : 全部
voter - true       : 已投票

populate : 默认情况下不填充items，只返回vote基本信息，如果需要填充信息，可加此参数，值为要填充的field,多个field使用"_"分割，传all代表全部填充
```

### Response Body
```
[{
  _id : {
    type : String,
    description : 'Vote ID'
  },
  title : {
    type : String,
    description : 'Vote 标题'
  },
  description : {
    type : String,
    description : 'Vote 描述'
  },
  type : {
    type : Number,
    description : 'Vote 类型， 0 单选， 1 多选'
  },
  status : {
    type : Number,
    description : 'Vote 状态， 0 未发布，1 已发布'
  },
  // voter参数必须为true才存在
  voteStatus : {
    type : String,
    description : '是否已经投票，Y 已投票 N 未投票'
  },
  // 选择性填充
  items : [{
    description : {
      type : String,
      description : 'item描述信息'
    },
    _id : {
      type : String,
      description : 'item ID'
    }
  }],
  votersCount : {
    type : Number,
    description : '已投票的总人数'
  },
  createTime : {
    type : Number,
    description : '创建时间'
  },
  endTime : {
    type : Number,
    description : '投票结束时间'
  }
}]
```

## 查询Vote Details
### ID
```
V_0500
```

### URI
```
GET /votes/{voteId}?[populate=items.voters]&[voter=true|false]

populate : 默认情况下不填充items.voters，只返回vote基本信息和items，如果需要填充信息，可加此参数，值为要填充的field,多个field使用"_"分割，传all代表全部填充
```

### Response Body
```
{
  _id : {
    type : String,
    description : 'Vote ID'
  },
  title : {
    type : String,
    description : 'Vote 标题'
  },
  description : {
    type : String,
    description : 'Vote 描述'
  },
  type : {
    type : Number,
    description : 'Vote 类型， 0 单选， 1 多选'
  },
  status : {
    type : Number,
    description : 'Vote 状态， 0 未发布，1 已发布'
  },
  // voter参数必须为true才存在
  voteStatus : {
    type : String,
    description : '是否已经投票，Y 已投票 N 未投票'
  },
  items : [{
    description : {
      type : String,
      description : 'item描述信息'
    },
    _id : {
      type : String,
      description : 'item ID'
    },
    voters: [{
      voterInfo : {
        staffId : String,
        staffIdHT : String,
        cName : String,
        eName : String,
        jobTitle : String
      }
    }]
  }],
  votersCount : {
    type : Number,
    description : '已投票的总人数'
  },
  createTime : {
    type : Number,
    description : '创建时间'
  },
  endTime : {
    type : Number,
    description : '投票结束时间'
  }
}
```

## 用户投票
### ID
```
V_0200
```

### URI
```
PUT /votes/{voteId}
```

### Request Body
```
{
  actionId : "VOTE",
  items : {
    type: String | [String]    // String为Vote ID
  }
}
```

### Response Body
```
{
  message : "resource updated"
}
```
