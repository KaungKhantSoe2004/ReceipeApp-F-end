const key_name = "kaung-khant-recipe";
export const setName = (name) => {
  localStorage.setItem(`${key_name}_name`, name);
};
export const setToken = (token) => {
  localStorage.setItem(`${key_name}_token`, token);
};
export const setUser = (user) => {
  localStorage.setItem(`${key_name}_user`, user);
};
export const setId = (id) => {
  localStorage.setItem(`${key_name}_id`, id);
};
export const getToken = () => {
  return localStorage.getItem(`${key_name}_token`);
};
export const getUser = () => {
  return localStorage.getItem(`${key_name}_user`);
};

export const getId = () => {
  return localStorage.getItem(`${key_name}_id`);
};

export const getName = () => {
  return localStorage.getItem(`${key_name}_name`);
};
export const removeToken = () => {
  localStorage.removeItem(`${key_name}_token`);
};
export const removeUser = () => {
  localStorage.removeItem(`${key_name}_user`);
};

export const removeId = () => {
  return localStorage.removeItem(`${key_name}_id`);
};
export const removeName = () => {
  return localStorage.removeItem(`${key_name}_name`);
};
