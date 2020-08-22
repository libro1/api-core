class Utils {
  static getResposeError(msg: string) {
    return {
      errors: [
      {
        msg: msg,
        location: "body"
      }
    ]
  }
  }
  static const = {
    
  }
}

export default Utils