'use strict'
var express = require('express');
var web = express.Router();
const path = require('path');
const config = require('../public/js/config')

//////////////
// FRONT PAGES
web.get('/admin/login', (req, res)=> {
    res.render('../views/pages/login/login', {
      versionDonbot:process.env.VERSION_DONBOT,
      libs:['libs/axios', 'pages/login','config'],
      sheets:['bootstrap.min', 'scrollbar', 'fontello', 'custom', 'signin']
    });
});
web.get('/admin/home', (req, res)=> {
  res.render('../views/pages/admin/home', {
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/axios', 'libs/ajaxHeaders', 'libs/logout', 'config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'custom']
  });
});
web.get('/admin/flows', (req, res)=> {
  res.render('../views/pages/admin/flows', {
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/axios', 'libs/ajaxHeaders', 'libs/logout', 'libs/underscore', 'vars/queues', 'pages/flows', 'config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'custom']
  });
});
web.get('/admin/flows/:queue/:type', (req, res)=> {
  res.render('../views/pages/admin/flows_queue_type', {
    queue:req.params.queue,
    type:req.params.type,
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/jquery', 'libs/jquery.datatables', 'libs/datatables.bootstrap', 'vars/datatablesOptions', 'libs/ajaxHeaders', 'libs/axios', 'libs/logout', 'pages/flows.queue.type', 'config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'datatables.bootstrap', 'custom']
  });
});
web.get('/admin/flows/:queue/:type/:job', (req, res)=> {
  res.render('../views/pages/admin/flows_queue_type_job', {
    queue:req.params.queue,
    type:req.params.type,
    job:req.params.job,
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/jquery', 'libs/axios', 'libs/ajaxHeaders', 'libs/logout', 'pages/flows.queue.type.job', 'config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'custom']
  });
});
web.get('/admin/orders', (req, res)=> {
  res.render('../views/pages/admin/orders', {
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/jquery', 'libs/bootstrap.bundle.min', 'libs/jquery.datatables', 'libs/datatables.bootstrap', 'vars/datatablesOptions', 'libs/axios', 'libs/ajaxHeaders', 'libs/logout', 'pages/orders','config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'datatables.bootstrap', 'custom']
  });
});
web.get('/admin/logs_flows', (req, res)=> {
  res.render('../views/pages/admin/logs_flows', {
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/jquery', 'libs/bootstrap.bundle.min', 'libs/underscore', 'libs/jquery.datatables', 'libs/datatables.bootstrap', 'vars/datatablesOptions', 'libs/axios', 'libs/ajaxHeaders', 'libs/logout', 'pages/logs_flows', 'config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'datatables.bootstrap', 'custom']
  });
});
web.get('/admin/logs', (req, res)=> {
  res.render('../views/pages/admin/logs', {
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/jquery', 'libs/bootstrap.bundle.min', 'libs/underscore', 'libs/jquery.datatables', 'libs/datatables.bootstrap', 'vars/datatablesOptions', 'libs/axios', 'libs/ajaxHeaders', 'libs/logout', 'pages/logs', 'config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'datatables.bootstrap', 'custom']
  });
});
web.get('/admin/me', (req, res)=> {
  res.render('../views/pages/admin/me', {
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/axios' , 'libs/ajaxHeaders', 'libs/logout', 'pages/me', 'config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'custom', 'me']
  });
});
web.get('/admin/mails_notification', (req, res)=> {
  res.render('../views/pages/admin/mails_notification', {
    versionDonbot:process.env.VERSION_DONBOT,
    libs:['libs/jquery', 'libs/bootstrap.bundle.min', 'libs/jquery.datatables', 'libs/datatables.bootstrap', 'vars/datatablesOptions', 'libs/axios', 'libs/ajaxHeaders', 'libs/logout', 'pages/mails_notification','config'],
    sheets:['bootstrap.min', 'scrollbar', 'fontello', 'datatables.bootstrap', 'custom']
  });
});

module.exports = web;