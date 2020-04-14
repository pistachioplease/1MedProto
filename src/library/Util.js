import { 
  AsyncStorage,
} from 'react-native';

const jobTitles = [
  "Internal Medicine",
  "Pediatrician",
  "Family Medicine",
  "General Surgery",
  "Psychiatry",
  "Neurology",
  "Pathology",
  "Geriatrics",
];

class Util {
  capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  randomJobTitles() {
    return jobTitles[Math.floor(Math.random() * jobTitles.length)];
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async storeUser(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getUser() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      // console.log(data);

      return data;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async storeDoctors(doctors) {
    try {
      await AsyncStorage.setItem("doctors", JSON.stringify(doctors));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      let data = await AsyncStorage.getItem(key);
      let parsed = JSON.parse(data);
      console.log(data);

      return true;
    }
    catch(exception) {
      return false;
    }
  } 

}

const U = new Util();
export default U;
