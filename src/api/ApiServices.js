// import { useState } from "react";
// import { AppContext } from '../context/user/AppContext';
export async function PostCallWithErrorResponse(url, requestBody) {
  var resp;
  // const [progress, setProgress] = useState(0);
  // const { customerData } = useContext(AppContext);

  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({...customerData,...requestBody})
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function multipartPostCallWithErrorResponse(url, requestBody) {
  var resp;
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //"Content-Type": "multipart/form-data",
      // 'Authorization': 'Token ' + await AsyncStorage.getItem(AppStrings.TOKEN)
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function getWithAuthCallWithErrorResponse(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: "Token " + localStorage.getItem("USER_AUTH_TOKEN"),
    },
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function postWithAuthCallWithErrorResponse(url, requestBody) {
  var resp;
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      'Content-Type': 'multipart/form-data',
      // Authorization: "Token " + localStorage.getItem("api_key"),
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function putMultipartWithAuthCallWithErrorResponse(
  url,
  requestBody
) {
  var resp;
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      //'Content-Type': 'multipart/form-data',
      // Authorization: "Token " + localStorage.getItem("USER_AUTH_TOKEN"),
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function postMultipartWithAuthCallWithErrorResponse(
  url,
  requestBody
) {
  var resp;
  return await fetch(url, {
    method: "POST",

    headers: {
      Accept: "application/json",
      // Authorization: "Token " + localStorage.getItem("USER_AUTH_TOKEN"),
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function simpleGetCallWithErrorResponse(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function simpleGetCall(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function simplePostCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
  //.then(data=>data.json());
}

export async function multipartPostCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //'Content-Type': 'multipart/form-data',
      // 'Authorization': 'Token ' + await AsyncStorage.getItem(AppStrings.TOKEN)
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function getWithAuthCall(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: 'Token ' + (await AsyncStorage.getItem(AppStrings.TOKEN)),
    },
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function postWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: 'Token ' + (await AsyncStorage.getItem(AppStrings.TOKEN)),
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function putWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: 'Token ' + (await AsyncStorage.getItem(AppStrings.TOKEN)),
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function postMultipartWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function putMultipartWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      //Authorization: 'Token ' + (await AsyncStorage.getItem(AppStrings.TOKEN)),
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}
export async function updateProfile(url, requestBody) {
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      // Authorization: 'Token ' + (await AsyncStorage.getItem(AppStrings.token)),
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

//-------------------------------------
export async function getResult(data) {
  //console.log('--------------', data);
  return JSON.parse(data.trim());
}
//-------------------------------------
