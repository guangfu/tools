let storageWithTimestamp = {
  save(name, value) {
    let obj = {
      timestamp: Date.now(),
      value: value
    }

    return localStorage.setItem(name, JSON.stringify(obj));
  },
  isExpired(name, hours = 6) {
    let obj = localStorage.getItem(name);
    if (!obj) return { expire: true, null };

    obj = JSON.parse(obj);
    if (Date.now() - obj.timestamp > hours * 60 * 60 * 1000) {
      return {
        expire: true,
        value: null
      }
    } else {
      return {
        expire:false,
        value: obj.value
      }
    }
  }
}

export default storageWithTimestamp;
