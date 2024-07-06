class CustomApiError extends Error {
    // private data: any;
  
    constructor(message, customData) {
      super(message);
      this.name = this.constructor.name;
      this.data = customData;
  
      Object.setPrototypeOf(this, CustomApiError.prototype);
    }
  
    getCustomData(){
      return this.data;
    }
  }
  
  export default CustomApiError;
  