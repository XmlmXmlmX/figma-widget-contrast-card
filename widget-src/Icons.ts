namespace Icons {
  export const check = (
    color:
      | string
      | null
      | undefined = "var(--color-icon-menu-secondary, rgba(255, 255, 255, .8))"
  ) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="${color}"/>
</svg>`;

  export const Check = check();

  export const disabledCheck = (
    color:
      | string
      | null
      | undefined = "var(--color-icon-menu-secondary, rgba(255, 255, 255, .8))"
  ) => `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.6281 22.1972L17.6781 19.2472C16.8781 19.7806 16.0156 20.1889 15.0906 20.4722C14.1656 20.7556 13.1865 20.8972 12.1531 20.8972C10.7698 20.8972 9.46979 20.6347 8.25313 20.1097C7.03646 19.5847 5.97813 18.8722 5.07812 17.9722C4.17812 17.0722 3.46562 16.0139 2.94062 14.7972C2.41562 13.5806 2.15313 12.2806 2.15313 10.8972C2.15313 9.86388 2.29479 8.88472 2.57812 7.95972C2.86146 7.03472 3.26979 6.17222 3.80313 5.37222L0.828125 2.39722L2.25313 0.972217L22.0531 20.7722L20.6281 22.1972ZM12.1531 18.8972C12.9031 18.8972 13.6156 18.7972 14.2906 18.5972C14.9656 18.3972 15.6031 18.1222 16.2031 17.7722L12.3281 13.8972L10.7531 15.4972L6.50313 11.2472L7.90313 9.84722L10.7531 12.6972L10.9281 12.4972L5.27813 6.84722C4.92813 7.44722 4.65313 8.08472 4.45312 8.75972C4.25312 9.43472 4.15313 10.1472 4.15313 10.8972C4.15313 13.1139 4.93229 15.0014 6.49062 16.5597C8.04896 18.1181 9.93646 18.8972 12.1531 18.8972ZM20.5281 16.3972L19.0531 14.9222C19.4031 14.3389 19.674 13.7097 19.8656 13.0347C20.0573 12.3597 20.1531 11.6472 20.1531 10.8972C20.1531 8.68055 19.374 6.79305 17.8156 5.23472C16.2573 3.67638 14.3698 2.89722 12.1531 2.89722C11.4031 2.89722 10.6906 2.99305 10.0156 3.18472C9.34062 3.37638 8.71146 3.64722 8.12813 3.99722L6.65313 2.52222C7.45313 2.00555 8.31563 1.60555 9.24063 1.32222C10.1656 1.03888 11.1365 0.897217 12.1531 0.897217C13.5365 0.897217 14.8365 1.15972 16.0531 1.68472C17.2698 2.20972 18.3281 2.92222 19.2281 3.82222C20.1281 4.72222 20.8406 5.78055 21.3656 6.99722C21.8906 8.21388 22.1531 9.51388 22.1531 10.8972C22.1531 11.9139 22.0115 12.8847 21.7281 13.8097C21.4448 14.7347 21.0448 15.5972 20.5281 16.3972ZM15.2031 11.0472L13.8031 9.64722L16.4031 7.04722L17.8031 8.44722L15.2031 11.0472Z" fill="${color}"/>
</svg>`;

  export const DisabledCheck = disabledCheck();

  export const colorize = (
    color:
      | string
      | null
      | undefined = "var(--color-icon-menu-secondary, rgba(255, 255, 255, .8))"
  ) => `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.04303 21.0536V16.3036L11.993 7.35361L10.543 5.95361L11.993 4.55361L13.893 6.45361L16.993 3.35361C17.0764 3.27028 17.1805 3.20361 17.3055 3.15361C17.4305 3.10361 17.5597 3.07861 17.693 3.07861C17.8264 3.07861 17.9514 3.10361 18.068 3.15361C18.1847 3.20361 18.293 3.27028 18.393 3.35361L20.743 5.70361C20.8264 5.80361 20.893 5.91195 20.943 6.02861C20.993 6.14528 21.018 6.27028 21.018 6.40361C21.018 6.53695 20.993 6.66611 20.943 6.79111C20.893 6.91611 20.8264 7.02028 20.743 7.10361L17.668 10.1786L19.568 12.1286L18.143 13.5536L16.743 12.1036L7.79303 21.0536H3.04303ZM5.04303 19.0536H6.99303L15.293 10.7036L13.393 8.80361L5.04303 17.1036V19.0536ZM16.218 8.80361L18.618 6.40361L17.693 5.47861L15.293 7.87861L16.218 8.80361Z" fill="${color}"/>
  </svg>`;

  export const Colorize = colorize();

  export const toggleOn = (
    color:
      | string
      | null
      | undefined = "var(--color-icon-menu-secondary, rgba(255, 255, 255, .8))"
  ) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 18C5.33333 18 3.91667 17.4167 2.75 16.25C1.58333 15.0833 1 13.6667 1 12C1 10.3333 1.58333 8.91667 2.75 7.75C3.91667 6.58333 5.33333 6 7 6H17C18.6667 6 20.0833 6.58333 21.25 7.75C22.4167 8.91667 23 10.3333 23 12C23 13.6667 22.4167 15.0833 21.25 16.25C20.0833 17.4167 18.6667 18 17 18H7ZM7 16H17C18.1 16 19.0417 15.6083 19.825 14.825C20.6083 14.0417 21 13.1 21 12C21 10.9 20.6083 9.95833 19.825 9.175C19.0417 8.39167 18.1 8 17 8H7C5.9 8 4.95833 8.39167 4.175 9.175C3.39167 9.95833 3 10.9 3 12C3 13.1 3.39167 14.0417 4.175 14.825C4.95833 15.6083 5.9 16 7 16ZM17 15C17.8333 15 18.5417 14.7083 19.125 14.125C19.7083 13.5417 20 12.8333 20 12C20 11.1667 19.7083 10.4583 19.125 9.875C18.5417 9.29167 17.8333 9 17 9C16.1667 9 15.4583 9.29167 14.875 9.875C14.2917 10.4583 14 11.1667 14 12C14 12.8333 14.2917 13.5417 14.875 14.125C15.4583 14.7083 16.1667 15 17 15Z" fill="${color}"/>
  </svg>`;

  export const ToggleOn = toggleOn();

  export const toggleOff = (
    color:
      | string
      | null
      | undefined = "var(--color-icon-menu-secondary, rgba(255, 255, 255, .8))"
  ) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 18C5.33333 18 3.91667 17.4167 2.75 16.25C1.58333 15.0833 1 13.6667 1 12C1 10.3333 1.58333 8.91667 2.75 7.75C3.91667 6.58333 5.33333 6 7 6H17C18.6667 6 20.0833 6.58333 21.25 7.75C22.4167 8.91667 23 10.3333 23 12C23 13.6667 22.4167 15.0833 21.25 16.25C20.0833 17.4167 18.6667 18 17 18H7ZM7 16H17C18.1 16 19.0417 15.6083 19.825 14.825C20.6083 14.0417 21 13.1 21 12C21 10.9 20.6083 9.95833 19.825 9.175C19.0417 8.39167 18.1 8 17 8H7C5.9 8 4.95833 8.39167 4.175 9.175C3.39167 9.95833 3 10.9 3 12C3 13.1 3.39167 14.0417 4.175 14.825C4.95833 15.6083 5.9 16 7 16ZM7 15C7.83333 15 8.54167 14.7083 9.125 14.125C9.70833 13.5417 10 12.8333 10 12C10 11.1667 9.70833 10.4583 9.125 9.875C8.54167 9.29167 7.83333 9 7 9C6.16667 9 5.45833 9.29167 4.875 9.875C4.29167 10.4583 4 11.1667 4 12C4 12.8333 4.29167 13.5417 4.875 14.125C5.45833 14.7083 6.16667 15 7 15Z" fill="${color}"/>
  </svg>`;

  export const ToggleOff = toggleOff();
}

export default Icons;
