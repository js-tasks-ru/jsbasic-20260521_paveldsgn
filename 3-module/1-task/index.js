function namify(users) {
  return users.filter(item => item.name).map(item => item.name);
}
