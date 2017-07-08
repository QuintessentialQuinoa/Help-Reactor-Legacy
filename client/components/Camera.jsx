
var SetCamera = (callback) => {

  return {
    constraints: {
      video: true,
      audio: true
    },
    onSuccess: (stream) => {
      window.stream = stream;
      // var src;
      // if (window.URL) {
      //   src = window.URL.createObjectURL(stream);
      // } else {
      //   src = stream;
      // }
      callback(stream);
    },
    onError: (error) => {
      console.error('Camera error: ', error);
    }
  };

};

export default SetCamera;