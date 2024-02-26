const express = require('express');
const router = express.Router();
const db = require('../database');

/* GET users listing. */
router.get('/user-list', (req, res)=> {
  const sql = 
  "WITH CTE AS (SELECT SUBSTRING_INDEX(a.File_name, '_', 1) AS File_name,SUBSTRING_INDEX(a.File_name, '_', -1) AS File_name_suffix,a.timestamp,a.value FROM Airtel1 a JOIN (SELECT File_name,MAX(STR_TO_DATE(timestamp, '%d-%b-%y %h:%i:%s %p')) AS max_timestamp FROM Airtel1 GROUP BY File_name) b ON a.File_name = b.File_name AND STR_TO_DATE(a.timestamp, '%d-%b-%y %h:%i:%s %p') = b.max_timestamp)SELECT File_name,MAX(CASE WHEN File_name_suffix = 'RAH' THEN timestamp END) AS RAH_timestamp,MAX(CASE WHEN File_name_suffix = 'RAH' THEN ROUND(value,1) END) AS RAH_value,MAX(CASE WHEN File_name_suffix = 'RAT' THEN timestamp END) AS RAT_timestamp,MAX(CASE WHEN File_name_suffix = 'RAT' THEN ROUND(value,1) END) AS RAT_value,MAX(CASE WHEN File_name_suffix = 'SAT' THEN timestamp END) AS SAT_timestamp,MAX(CASE WHEN File_name_suffix = 'SAT' THEN ROUND(value,1) END) AS SAT_value FROM CTE GROUP BY File_name;";
  db.query(sql, (error, data) => {
    if (error) {
      throw error;
    }
    
    
      res.render('user-list', 
         {userData: data}
         );
    
  });

});

module.exports = router;
    
    
    
    
    
      
