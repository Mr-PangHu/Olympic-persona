let db = require('../db2/index')

exports.getBasicInfo = (req, res) => { // 获取用户基本数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'select * from person_info'
    connection.query(sql, (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.addBasicInfo = (req, res) => { // 添加数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'insert into person_info (name,birthday,age,gender,marital_status,education_level,professional_training_years,training_experience,sports_level,height,weight) values (?,?,?,?,?,?,?,?,?,?,?)'
    connection.query(sql, [req.query.name, req.query.birthday, req.query.age, req.query.gender, req.query.marital_status, req.query.education_level, req.query.professional_training_years, req.query.training_experience, req.query.sports_level, req.query.height, req.query.weight], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        status: 200,
        message: '添加成功'
      })
    })
  })
}

exports.deleteBasicInfo = (req, res) => { // 通过id删除数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'delete from person_info where id = ?'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        status: 200,
        message: '删除成功'
      })
    })
  })
}

exports.updateBasicInfo = (req, res) => { // 通过id更新数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'update person_info set name = ?,birthday = ?,age = ?,gender = ?,marital_status = ?,education_level = ?,professional_training_years = ?,training_experience = ?,sports_level = ?,height = ?,weight = ? where id = ?'
    connection.query(sql, [req.query.name, req.query.birthday, req.query.age, req.query.gender, req.query.marital_status, req.query.education_level, req.query.professional_training_years, req.query.training_experience, req.query.sports_level, req.query.height, req.query.weight, req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        status: 200,
        message: '修改成功'
      })
    })
  })
}

exports.searchName = (req, res) => { // 通过id更新数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT name FROM person_info'
    // var searchValue = '%' + req.query.name + '%'
    connection.query(sql, (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        status: 200,
        message: 'success',
        data
      })
    })
  })
}

exports.getPersonInfo = (req, res) => { // 获取个人信息
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'select * from person_info where id = ?'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getPersonInfoByAthleteId = (req, res) => { // 通过athlete_id获取个人信息
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'select * from person_info where athlete_id = ?'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getId = (req, res) => { // 获取Id
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'select id from person_info where athlete_id = ?'
    connection.query(sql, [req.query.athleteId], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getAthleteId = (req, res) => { // 获取Id
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'select athlete_id from person_info where id = ?'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getGroupMember = (req, res) => { // 获取登录者相同组别队员的信息
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'select * from person_info where group_id = ?'
    connection.query(sql, [req.query.group], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getByUserId = (req, res) => { // 通过userid获取整个用户信息，这里为了得到登录者的组别
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'select * from user where id = ?'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}
