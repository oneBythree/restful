/**
 * 用户api
 */

var express = require('express');
var router = express.Router();

var dbhelper = require('../db/helper.js');

var config = require('../db/config.js');
var mysql = require('mysql');
var mainPool = mysql.createPool(config.main);

var helper = new dbhelper.helper(mainPool);

//引入公用函数
var common = require('../common/common.js');


var sql = {
    login: 'SELECT t_xt_yh.YH_ID, t_xt_yh.YH_DM, t_xt_yh.YH_MC, t_xt_yh.MM,t_xt_yh.XB, t_xt_yh.YH_LX, t_xt_yh.YH_JS, t_xt_yh.XH,t_xt_yh.YX_BJ, t_xt_yh.SC_BJ, t_xt_yh.LR_RQ, t_xt_yh.XG_RQ,t_xt_yh.CZRY_ID, t_xt_yh.EMAIL, t_xt_yh.BZ, t_xt_jg.JG_ID,t_xt_jg.JG_DM, t_xt_jg.JG_MC, t_xt_gw.GW_ID, t_xt_gw.GW_DM,t_xt_gw.GW_MC FROM t_xt_yh left join t_xt_jg_yh on t_xt_yh.yh_id=t_xt_jg_yh.yh_id left join t_xt_jg on t_xt_jg_yh.jg_id=t_xt_jg.jg_id left join t_xt_yh_gw on t_xt_yh.yh_id=t_xt_yh_gw.yh_id left join t_xt_gw on t_xt_gw.gw_id=t_xt_yh_gw.gw_dm WHERE t_xt_yh.YH_DM = ',
}

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username) {
        res.json(common.resErrorJSON('用户名不能为空!'))
    }

    if (!password) {
        res.json(common.resErrorJSON('密码不能为空!'))
    }

    var sqlLogin = sql.login + "'" + username + "'";
    console.log('---------------- 查询单个进场信息 ----------------');
    console.log(sqlLogin)
    console.log('---------------------------------------------------');
    helper.query(sqlLogin, function(err, result) {
        if (err) {
            res.json(common.msyqlErrorAction(err));
        } else {
            if (result[0] == undefined) {
                res.json(common.resErrorJSON('用户名不存在!'))
            } else {
                if (result[0].MM == password) {
                	req.session.user = result[0];
                    res.json(common.resResultJSON(true, '登录成功！'));
                } else {
                    res.json(common.resErrorJSON('密码不正确!'));
                }
            }
        }
    })
})


module.exports = router;
