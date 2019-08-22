import Sequelize from 'sequelize';
import hospital_model from './models/hospital';
import patient from './models/patient';
import patient_level from './models/patient_level';
import basic from './models/basic';
import general from './models/general';
import maternal from './models/maternal';
import baby_appear from './models/baby_appear';
import baby_resp from './models/baby_resp';
import baby_cv from './models/baby_cv';
import baby_cns from './models/baby_cns';
import baby_final from './models/baby_final';
import baby_antibiotic from './models/baby_antibiotic';
import baby_investigation from './models/baby_investigation';
import baby_git from './models/baby_git';
import setting from './config/setting';
// const sequelize = new Sequelize(
//   setting.dev_db, setting.dev_user, setting.dev_password, {
//     host: setting.dev_host,
//     dialect: setting.db_type,
//   });

const sequelize = new Sequelize(
  setting.local_db, setting.local_user, setting.local_password, {
    host: setting.local_host,
    dialect: setting.db_type,
  });

const patient_db = patient(sequelize, Sequelize);
const hospital_db = hospital_model(sequelize, Sequelize);
const patient_level_db = patient_level(sequelize, Sequelize);
const basic_db = basic(sequelize, Sequelize);
const general_db = general(sequelize, Sequelize);
const maternal_db = maternal(sequelize, Sequelize);
const baby_appear_db = baby_appear(sequelize, Sequelize);
const baby_resp_db = baby_resp(sequelize, Sequelize);
const baby_cv_db = baby_cv(sequelize, Sequelize);
const baby_cns_db = baby_cns(sequelize, Sequelize);
const baby_git_db = baby_git(sequelize, Sequelize);
const baby_final_db = baby_final(sequelize, Sequelize);
const baby_antibiotic_db = baby_antibiotic(sequelize, Sequelize);
const baby_investigation_db = baby_investigation(sequelize, Sequelize);



sequelize.sync().then(() => {}).finally(() => {
  //sequelize.close();
});

module.exports = {
  sequelize: sequelize,
  hospital_model: hospital_db,
  patient_model: patient_db,
  patient_level_model: patient_level_db,
  basic_model: basic_db,
  general_model: general_db,
  maternal_model: maternal_db,
  baby_appear_model: baby_appear_db,
  baby_resp_model: baby_resp_db,
  baby_cv_model: baby_cv_db,
  baby_cns_model: baby_cns_db,
  baby_git_model: baby_git_db,
  baby_final_model: baby_final_db,
  baby_antibiotic_model: baby_antibiotic_db,
  baby_investigation_model: baby_investigation_db
};