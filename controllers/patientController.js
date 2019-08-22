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

pReadingModels.baby_appear_model.create(req.body.baby_appears).then().catch(err => {
  console.log("error:",err)
 })

pReadingModels.baby_resp_model.create(req.body.baby_resp).then().catch(err => {
  console.log("error:",err)
 })

pReadingModels.baby_cv_model.create(req.body.baby_cv).then().catch(err => {
  console.log("error:",err)
 })

pReadingModels.baby_cns_model.create(req.body.baby_cns).then().catch(err => {
  console.log("error:",err)
 })

pReadingModels.baby_git_model.create(req.body.baby_git).then().catch(err => {
  console.log("error:",err)
 })

pReadingModels.baby_final_model.create(req.body.baby_final).then().catch(err => {
  console.log("error:",err)
 })

pReadingModels.baby_antibiotic_model.create(req.body.baby_antibiotic).then().catch(err => {
  console.log("error:",err)
 })

pReadingModels.baby_investigation_model.create(req.body.baby_investigation).then(result => {
    res.json( responseHelper.success(constant.data_created_successfully,req.body))})
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyAppearsModel =(req,res,next) =>{

  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_appears_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyRespModel =(req,res,next)=>{
  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_resp_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyCVModel =(req,res,next)=>{
  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_cv_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyCNSModel=(req,res,next)=>{
  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_cns_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyGITModel=(req,res,next)=>{
  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_git_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyInvestigationModel =(req,res,next)=>{
  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_investigations pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyAntibioticModel =(req,res,next)=>{
  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_antibiotics pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
  }, type: sequelize.QueryTypes.SELECT }
  ).then(result => {
    res.json( responseHelper.success(constant.success,result))
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBabyFinalModel=(req,res,next)=>{
  var study_id=req.params.studyId
  var hospital_id=req.params.hospitalId
  var reading=req.params.readingId

  sequelize.query('SELECT  DISTINCT * FROM patient_baby_finals pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1',
  { replacements: { 
    study_id:study_id,
    hospital_id:hospital_id,
    reading:reading
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
    console.log('result :' ,result.length)
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
    { 
    where :
    {
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
    }).catch(err => {
         console.log("error :" ,err)
    })

    pReadingModels.baby_resp_model.findAll(
      { 
      where :
      {
        study_id:req.params.studyId,
      },
      order:[
        ['createdAt', 'DESC']
       ],
       limit: 1
      }).then(result => {
        models.baby_resp=result[0]
      }).catch(err => {
           console.log("error :" ,err)
      })

      pReadingModels.baby_cv_model.findAll(
        { 
        where :
        {
          study_id:req.params.studyId,
        },
        order:[
          ['createdAt', 'DESC']
         ],
         limit: 1
        }).then(result => {
          models.baby_cv=result[0]
        }).catch(err => {
             console.log("error :" ,err)
        })

        pReadingModels.baby_cns_model.findAll(
          { 
          where :
          {
            study_id:req.params.studyId,
          },
          order:[
            ['createdAt', 'DESC']
           ],
           limit: 1
          }).then(result => {
            models.baby_cns=result[0]
          }).catch(err => {
               console.log("error :" ,err)
          })

          pReadingModels.baby_git_model.findAll(
            { 
            where :
            {
              study_id:req.params.studyId,
            },
            order:[
              ['createdAt', 'DESC']
             ],
             limit: 1
            }).then(result => {
              models.baby_git=result[0]
             
            }).catch(err => {
                 console.log("error :" ,err)
            })

            pReadingModels.baby_investigation_model.findAll(
              { 
              where :
              {
                study_id:req.params.studyId,
              },
              order:[
                ['createdAt', 'DESC']
               ],
               limit: 1
              }).then(result => {
                models.baby_investigation=result[0]
                
              }).catch(err => {
                   console.log("error :" ,err)
              })

              pReadingModels.baby_antibiotic_model.findAll(
                { 
                where :
                {
                  study_id:req.params.studyId,
                },
                order:[
                  ['createdAt', 'DESC']
                 ],
                 limit: 1
                }).then(result => {
                  models.baby_antibiotic=result[0]
                }).catch(err => {
                     console.log("error :" ,err)
                })

                pReadingModels.baby_final_model.findAll(
                  { 
                  where :
                  {
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
      }
    }).then(result => {

      console.log("baby resp model response :" , result)

      if(result.length == 0){
     
        res.json( responseHelper.notFound(constant.no_record_found))
  
       }else{
     var row = result[0]
     var baby_respiratory_support = JSON.parse(req.body.baby_respiratory_support); 
     row.groaning =  req.body.groaning,
     row.grunting = req.body.grunting,
     row.stridor = req.body.stridor,
     row.retraction = req.body.retraction,
     row.fast_breathing = req.body.fast_breathing,
     row.oxygen_saturation = req.body.oxygen_saturation,
     row.breathing_rate = req.body.breathing_rate,
     row.baby_chest_indrawing = req.body.baby_chest_indrawing,
     row.x_ray_result = req.body.x_ray_result,
     row.x_ray_status_done = req.body.x_ray_status_done,
     row.x_ray_status = req.body.x_ray_status,
     row.x_ray_diagnosis_any_other = req.body.x_ray_diagnosis_any_other,
     row.apnea_diagnosis = req.body.apnea_diagnosis,
     row.apnea_status = req.body.apnea_status,
     row.baby_respiratory_support =baby_respiratory_support,
     row.baby_respiratory_support_if_yes = req.body.baby_respiratory_support_if_yes,
     row.tab_name = req.body.tab_name
     return row.save()
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
      }
    }).then(result => {
     if(result.length == 0){
     
      res.json( responseHelper.notFound(constant.no_record_found))

     }else{
     var row = result[0]
     row.heart_rate= req.body.heart_rate ,
     row.urine_output=req.body.urine_output,
     row.baby_blood_pressure_mean_arterial_bp= req.body.baby_blood_pressure_mean_arterial_bp,
     row.baby_blood_pressure_upper_limb=req.body.baby_blood_pressure_upper_limb ,
     row.baby_blood_pressure_lower_limb=req.body.baby_blood_pressure_lower_limb ,
     row.capillary_refill_unit=req.body.capillary_refill_unit ,
     row.low_peripheral_pulse_volume=req.body.low_peripheral_pulse_volume ,
     row.cool_peripheries=req.body.cool_peripheries,
     row.two_d_echo_done=req.body.two_d_echo_done ,
     row.two_d_echo_done_if_yes= req.body.two_d_echo_done_if_yes,
     row.baby_on_ionotropes= req.body.baby_on_ionotropes ,
     row.central_line= req.body.central_line,
     row.skin_pustules= req.body.skin_pustules,
     row.infusion_of_blood_products=req.body.infusion_of_blood_products
     return row.save()
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
     var row = result[0]
     row.features_of_encephalopathy= req.body.features_of_encephalopathy,
     row.seizures= req.body.seizures,
     row.abnormal_movements_like_tonic_posturing= req.body.abnormal_movements_like_tonic_posturing,
     row.af_bulge= req.body.af_bulge,
     row.tab_name= req.body.tab_name   
     return row.save()
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
     var row = result[0]
   row .abdominal_dystension= req.body.abdominal_dystension,
   row. frequency_of_stools= req.body.frequency_of_stools,
   row.diarrhea= req.body.diarrhea,
   row.vomiting= req.body.vomiting,
   row.feeding_intolerance= req.body.feeding_intolerance,
   row.baby_movement=req.body.baby_movement,
   row.tab_name= req.body.tab_name
     return row.save()
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
     var row = result[0]
     row.baby_thyroid_status= req.body.baby_thyroid_status,
     row.baby_thyroid_result= req.body.baby_thyroid_result,
     row.baby_blood_glucose= req.body.baby_blood_glucose,
     row.baby_haemoglobin_levels= req.body.baby_haemoglobin_levels,
     row.baby_c_reactive_protien_levels= req.body.baby_c_reactive_protien_levels,
     row.micro_esr=req.body.micro_esr,
     row.baby_procalcitonin_levels=req.body.baby_procalcitonin_levels,
     row.total_leucocute_count_unit=req.body.total_leucocute_count_unit,
     row.total_leucocute_count=req.body.total_leucocute_count,
     row.absolute_neutrophil_count=req.body.absolute_neutrophil_count,
     row.absolute_neutrophil_count_unit=req.body.absolute_neutrophil_count_unit,
     row.immature_to_mature_neutrophil_ratios=req.body.immature_to_mature_neutrophil_ratios,
     row.thrombocytopenia_unit=req.body.thrombocytopenia_unit,
     row.thrombocytopenia=req.body.thrombocytopenia,
     row.urine_rest_for_pus_cells=req.body.urine_rest_for_pus_cells,
     row.urine_culture_test=req.body.urine_culture_test,
     row.blood_culture_report=req.body.blood_culture_report,
     row.gram_positive_bacteria=req.body.gram_positive_bacteria,
     row.gram_positive_bacteria_if_other=req.body.gram_positive_bacteria_if_other,
     row.gram_negative_bacteria=req.body.gram_negative_bacteria,
     row.gram_negative_bacteria_if_other=req.body.gram_negative_bacteria_if_other,
     row.fungi=req.body.fungi,
     row.other_organism=req.body.other_organism,
     row.antibiotic_status_resisitant=req.body.antibiotic_status_resisitant,
     row.antibiotic_status_intermediate=req.body.antibiotic_status_intermediate,
     row.antibiotic_status_value=req.body.antibiotic_status_value,
     row.sodium=req.body.sodium,
     row.potassium=req.body.potassium,
     row.chlorine=req.body.chlorine,
     row.calcium= req.body.calcium,
     row.phosphate= req.body.phosphate,
     row.magnesium=req.body.magnesium,
     row.urea=req.body.urea,
     row.creatinine=req.body.creatinine,
     row.lactate_levels=req.body.lactate_levels,
     row.bilirubin_levels=req.body.bilirubin_levels,
     row.cord_ph=req.body.cord_ph,
     row.arrhythmia=req.body.arrhythmia,
     row.csf_culture=req.body.csf_culture,
     row.csf_culture_tsb_value=req.body.csf_culture_tsb_value,
     row.tab_name=req.body.tab_name
     return row.save()
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
     var row = result[0]
     row.antibiotic_given= req.body.antibiotic_given,
     row.date_of_administration_of_antiobiotic= req.body.date_of_administration_of_antiobiotic,
     row.time_of_administration_of_antiobiotic_hours=req.body.time_of_administration_of_antiobiotic_hours,
     row.time_of_administration_of_antiobiotic_minute=req.body.time_of_administration_of_antiobiotic_minute,
     row.antibiotic_name= req.body.antibiotic_name,
     row.antibiotic_name_if_other= req.body.antibiotic_name_if_other,
     row.date_of_blood_samples_sent_for_culture_test= req.body.date_of_blood_samples_sent_for_culture_test,
     row.time_of_blood_samples_sent_for_culture_test_hours= req.body.time_of_blood_samples_sent_for_culture_test_hours,
     row.time_of_blood_samples_sent_for_culture_test_minute= req.body.time_of_blood_samples_sent_for_culture_test_minute,
     row.blood_sample_taken_prior_to_antiobiotic_administration= req.body.blood_sample_taken_prior_to_antiobiotic_administration
     return row.save()
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
      var row = result[0]
      row.days_of_stay_in_hospital= req.body.days_of_stay_in_hospital,
      row.final_diagnosis_sepsis=req.body.final_diagnosis_sepsis,
      row.final_diagnosis_rds= req.body.final_diagnosis_rds,
      row.final_diagnosis_ttnb=req.body.final_diagnosis_ttnb,
      row.final_diagnosis_jaundice=req.body.final_diagnosis_jaundice,
      row.final_diagnosis_lbw=req.body.final_diagnosis_lbw,
      row.final_diagnosis_lga=req.body.final_diagnosis_lga,
      row.final_diagnosis_aga=req.body.final_diagnosis_aga,
      row.final_diagnosis_anemia= req.body.final_diagnosis_anemia,
      row.final_diagnosis_dextochordia=req.body.final_diagnosis_dextochordia,
      row.final_diagnosis_hypoglycemia=req.body.final_diagnosis_hypoglycemia,
      row.final_diagnosis_hypocalcemia=req.body.final_diagnosis_hypocalcemia,
      row.final_diagnosis_gastroenteritis=req.body.final_diagnosis_gastroenteritis,
      row.final_diagnosis_perinatal_respiratory_depression=req.body.final_diagnosis_perinatal_respiratory_depression,
      row.final_diagnosis_shock=req.body.final_diagnosis_shock,
      row.final_diagnosis_feeding_intolerence=req.body.final_diagnosis_feeding_intolerence,
      row.baby_discharge_date=req.body.baby_discharge_date,
      row.final_diagnosis_sga=req.body.final_diagnosis_sga,
      row.final_diagnosis_eos_los=req.body.final_diagnosis_eos_los,
      row.final_diagnosis_other=req.body.final_diagnosis_other
      return row.save()
     }
   })
   .then(result=>{
    res.json( responseHelper.success(constant.data_updated_successfully,req.body))
    })
    .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
    })
}





