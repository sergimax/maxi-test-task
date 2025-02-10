export const NewUserForm = () => {
  //   name, - обязательное
  // username, - обязательное
  // email, - обязательное + проверка корректности введенной почты
  // phone - обязательное (маска формата +7 999 999-99-99)
  // zipcode - не обязательное
  return (
    <>
      NewUserForm
      <div>
        <ul>
          <li>
            <label>
              name
              <input type="text" />
            </label>
          </li>
          <li>
            <label>
              username
              <input type="text" />
            </label>
          </li>
          <li>
            <label>
              email
              <input type="text" />
            </label>
          </li>
          <li>
            <label>
              phone
              <input type="text" />
            </label>
          </li>
          <li>
            <label>
              zipcode
              <input type="text" />
            </label>
          </li>
        </ul>
      </div>
    </>
  );
};
