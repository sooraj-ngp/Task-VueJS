function nameTruncate(string) {
    // console.log(string);
    if (string.length > 6) {
      string = string.substring(0, 6) + '...';
    }
    return string
}
function emailTruncate(string) {
    // console.log(string);
    if (string.length > 10) {
        string = string.substring(0, 10) + '...';
    }
    return string
}