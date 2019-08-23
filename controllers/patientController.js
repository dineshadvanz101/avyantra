const pReadingModels = require('../sequelize')
const {validationResult} = require('express-validator/check')
const responseHelper = require('../helper/res')
const constant = require('../helper/constant')
const {sequelize} = require('../sequelize')
const queries = require('../helper/queries')
const mapper = require('../mapper/mapper')

exports.updateBabyProfileByStudyId =(req,res,next)=>{

pReadingModels.general_model.findAll({
  where:{
    study_id:req.params.studyId
  }
})
.then(result=>{
  if(result.length==0){
    res.json( responseHelper.notFound(constant.no_record_found))
  }
result = mapper.babyGeneralProfileMapper(result[0],req)
return result.save()
})
.then(result=>{
  res.json( responseHelper.success(constant.data_updated_successfully,result))
}) 
.catch(err => {
res.json(responseHelper.serveError(constant.error_msg,err))
})
}

exports.updateMotherProfileByStudyId =(req,res,next)=>{
  pReadingModels.maternal_model.findAll({
    where:{
      study_id:req.params.studyId
    }
  })
  .then(result=>{
    if(result.length==0){
      res.json( responseHelper.notFound(constant.no_record_found))
    }
  result = mapper.babyMaternalProfileMapper(result[0],req)
  return result.save()
  })
  .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,result))
  }) 
  .catch(err => {
  res.json(responseHelper.serveError(constant.error_msg,err))
  })
}

exports.savePatientModels = (req,res,next)=>{

  const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    pReadingModels.maternal_model.findAll({

      where:{
        study_id:req.body.baby_appears.study_id
      }

    }).then(result=>{
      if(result.length == 0){
        res.json( responseHelper.notFound(constant.no_maternal_record_found,result))
      }
    }).catch(err=>{
      res.json(responseHelper.serveError(constant.error_msg,err))

    })

var baby_respiratory_support = JSON.parse(req.body.baby_resp.baby_respiratory_support); 

req.body.baby_resp.baby_respiratory_support=baby_respiratory_support

pReadingModels.baby_appear_model.create(req.body.baby_appears).then()

pReadingModels.baby_resp_model.create(req.body.baby_resp).then()

pReadingModels.baby_cv_model.create(req.body.baby_cv).then()

pReadingModels.baby_cns_model.create(req.body.baby_cns).then()

pReadingModels.baby_git_model.create(req.body.baby_git).then()

pReadingModels.baby_final_model.create(req.body.baby_final).then()

pReadingModels.baby_antibiotic_model.create(req.body.baby_antibiotic).then()

pReadingModels.baby_investigation_model.create(req.body.baby_investigation).then(result => {
    res.json( responseHelper.success(constant.data_created_successfully,req.body))})
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyAppearsModel =(req,res,next) =>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_appears_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyRespModel =(req,res,next)=>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_resp_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyCVModel =(req,res,next)=>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_cv_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyCNSModel=(req,res,next)=>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_cns_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyGITModel=(req,res,next)=>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_git_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyInvestigationModel =(req,res,next)=>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_investigations pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyAntibioticModel =(req,res,next)=>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_antibiotics pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyFinalModel=(req,res,next)=>{
  sequelize.query('SELECT  DISTINCT * FROM patient_baby_finals pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:req.params.studyId,
    hospital_id:req.params.hospitalId,
    reading:req.params.readingId
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getReadingIdByStudyId = (req ,res , next)=>{

  pReadingModels.baby_appear_model.findAll(
    { 
    where :{study_id:req.params.study_id},
    order:[
      ['createdAt', 'DESC']
     ],
     limit: 1
    }
    )
  .then(result =>{
     if(result.length == 0){
      res.json(responseHelper.success(constant.data_created_successfully,
        {
            study_id:req.params.study_id,
            reading_id:'R1'
        }))
      }else{
        var reading = result[0].reading
        var readingChar=reading.substring(0,1)
        var readingNo=reading.substring(1);
        ++readingNo
        reading = readingChar.concat(readingNo);
        res.json(responseHelper.success(constant.data_created_successfully,
          {
              study_id:req.params.study_id,
              reading_id:reading
          }))
     }
   }).catch(err => {
    res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.searchReadingIdByStudyIdAndMrn = (req,res,next)=>{
  var id = req.params.id
  var hospitalId =req.params.hospitalId
  var array =[]
  pReadingModels.basic_model.findAll({
  where:{
    baby_medical_record_number:id,
    hospital_id:hospitalId
    }
  }).then(result => {
  
  if(result.length==0){
    res.json( responseHelper.notFound(constant.no_record_found))
  }
    var basicResult ={
      study_id:result[0].id,
      baby_medical_record_number:result[0].baby_medical_record_number,
      reading:null
    }
    array[0]=basicResult
    var studyId = result[0].id
    pReadingModels.baby_appear_model.findAll({
      where:{
        study_id:studyId
      }
    })
    .then(result => {
     if(result.length == 0 ){
      res.json( responseHelper.success(constant.success,array))
     }else{
      sequelize.query('SELECT DISTINCT pbai.study_id,pbi.baby_medical_record_number,pbai.reading FROM patient_baby_appears_infos AS pbai,patient_basic_infos AS pbi WHERE pbai.study_id= pbi.id AND pbi.baby_medical_record_number= :baby_medical_record_number AND pbi.hospital_id =:hospital_id',
      { replacements: { baby_medical_record_number: id , hospital_id :hospitalId }, type: sequelize.QueryTypes.SELECT }
      )
      .then(result => {
        res.json( responseHelper.success(constant.success,result))
      })
     }
    })
   })
   .catch(err => {
    res.json({
        error_message:err
    })
  })
  }
  
exports.getPatientModels =(req,res,next)=>{
    var models ={
      baby_appears :{},
      baby_resp:{},
      baby_cv:{},
      baby_cns:{},
      baby_git:{},
      baby_investigation:{},
      baby_antibiotic:{},
      baby_final:{}
    }

  pReadingModels.baby_appear_model.findAll(
    {  where :{
      study_id:req.params.studyId,
    },
    order:[
      ['createdAt', 'DESC']
     ],
     limit: 1
    }).then(result => {
      if(result.length == 0){
        res.json( responseHelper.notFound(constant.no_record_found))
      }
      models.baby_appears=result[0]
    })

    pReadingModels.baby_resp_model.findAll(
      { 
      where : {
        study_id:req.params.studyId,
      },
      order:[
        ['createdAt', 'DESC']
       ],
       limit: 1
      }).then(result => {
        models.baby_resp=result[0]
      })

      pReadingModels.baby_cv_model.findAll(
        {  where :{
          study_id:req.params.studyId,
        },
        order:[
          ['createdAt', 'DESC']
         ],
         limit: 1
        }).then(result => {
          models.baby_cv=result[0]
        })

        pReadingModels.baby_cns_model.findAll(
          { where :{
            study_id:req.params.studyId,
          },
          order:[
            ['createdAt', 'DESC']
           ],
           limit: 1
          }).then(result => {
            models.baby_cns=result[0]
          })

          pReadingModels.baby_git_model.findAll(
            {  where :{
              study_id:req.params.studyId,
            },
            order:[
              ['createdAt', 'DESC']
             ],
             limit: 1
            }).then(result => {
              models.baby_git=result[0]
            })

            pReadingModels.baby_investigation_model.findAll(
              { where :{
                study_id:req.params.studyId,
              },
              order:[
                ['createdAt', 'DESC']
               ],
               limit: 1
              }).then(result => {
                models.baby_investigation=result[0]     
              })

              pReadingModels.baby_antibiotic_model.findAll(
                { where :{
                  study_id:req.params.studyId,
                },
                order:[
                  ['createdAt', 'DESC']
                 ],
                 limit: 1
                }).then(result => {
                  models.baby_antibiotic=result[0]
                })

                pReadingModels.baby_final_model.findAll(
                  {  where :{
                    study_id:req.params.studyId,
                  },
                  order:[
                    ['createdAt', 'DESC']
                   ],
                   limit: 1
                  }).then(result => {
                    models.baby_final=result[0]
                    res.json( responseHelper.success(constant.success,models))
                  }).catch(err => {
                    res.json(responseHelper.serveError(constant.error_msg,err))
                  })
}

exports.updateBabyAppearsModel = (req, res , next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_appear_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      }
    }).then(result => {
      if(result.length == 0){
        res.json( responseHelper.notFound(constant.no_record_found))
       } else{
     result = mapper.babyAppearsMapper(result[0],req)
     return result.save()
       }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.updateBabyRespModel = (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_resp_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      },
      order:[
        ['createdAt', 'DESC']
       ],
       limit: 1
    }).then(result => {
      if(result.length == 0){
        res.json( responseHelper.notFound(constant.no_record_found))
       }else{
     var baby_respiratory_support = JSON.parse(req.body.baby_respiratory_support); 
     var result = mapper.updateBabyRespMapper(result[0],req,baby_respiratory_support)
     return result.save()
       }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.updateBabyCVModel =(req,res,next)=>{
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_cv_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      },
      order:[
        ['createdAt', 'DESC']
       ],
       limit: 1
    }).then(result => {
     if(result.length == 0){
      res.json( responseHelper.notFound(constant.no_record_found))
     }else{
     var result = mapper.updateBabyCVMapper(result[0],req)
     return result.save()
     }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.updateBabyCNSModel = (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_cns_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      }
    }).then(result => {
     if(result.length == 0){
      res.json( responseHelper.notFound(constant.no_record_found))
     }else{
     var result = mapper.updateBabyCNSMapper(result[0],req) 
     return result.save()
     }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.updateBabyGITModel= (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_git_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      }
    }).then(result => {
     if(result.length == 0){
      res.json( responseHelper.notFound(constant.no_record_found))
     }else{
     var result = mapper.updateBabyGITMapper(result[0],req) 
     return result.save()
     }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.updateBabyInvestigationModel = (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_investigation_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      }
    }).then(result => {
     if(result.length == 0){
      res.json( responseHelper.notFound(constant.no_record_found))
     }else{
     var result = mapper.updateBabyInvestigationMapper(result[0],req)
     return result.save()
     }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.updateBabyAntibioticModel =(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_antibiotic_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      }
    }).then(result => {
     if(result.length == 0){
      res.json( responseHelper.notFound(constant.no_record_found))
     }else{
     var result = mapper.updateBabyAntibioticMapper(result[0],req)
     return result.save()
     }
  })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.updateBabyFinalModel =(req,res,next)=>{  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
  }
  pReadingModels.baby_final_model.findAll(
    { where :
      {
        study_id:req.params.study_id,
        reading :req.params.reading
      }
    }).then(result => {
     if(result.length == 0){
      res.json( responseHelper.notFound(constant.no_record_found))
    }else{
      var result = mapper.updateBabyAntibioticMapper(result[0],req)
      return result.save()
     }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}





