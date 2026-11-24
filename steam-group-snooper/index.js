javascript: (function () {
  result = "";
  document.querySelectorAll(".linkFriend ").forEach((elem) => {
    result += elem.href + " \n";
  });
  alert(result);
})();
