import { GuildMember } from "discord.js"

export const discordChannel = {
  setStory: "914770321079431208",
  whitelist: "929591874128338984",
  register: "914712459326152746",
  updateUCP: "914904500827983872",
  getUserInfo: "929591874128338984",
  refundRole: "925299181743116328"
}

export const userRoles = {
  verifyUCP: "914691384345239600",
  acceptedStory: "914691384345239601",
  girl: "914691384362008576",
  influencer: "914691384362008577",
  vip: "914691384362008578"
}

export const adminRoles = {
  volunteer: "929082338900602920",
  helper: "914691384362008579",
  admin: "914691384370421790",
  moderator: "914691384370421791",
  globalMod: "919291371133759528",
  executiveManagement: "941320237092044800",
  developer: "914691384370421794",
  founder: "914691384370421795",
}

export const findRole = (member: GuildMember, channel: string) => {
  if (member.roles.cache.find(r => r.id === channel))
    return true
  else
    return false
}

export const hasRole = (member: GuildMember, uRole: string) => {
  if (member.roles.cache.some(role => role.id == uRole))
    return true
  else
    return false
}

export const isRoleAdmin = (member: GuildMember) => {
  if (findRole(member, adminRoles.volunteer) ||
    findRole(member, adminRoles.helper) ||
    findRole(member, adminRoles.admin) ||
    findRole(member, adminRoles.moderator) ||
    findRole(member, adminRoles.globalMod) ||
    findRole(member, adminRoles.executiveManagement) ||
    findRole(member, adminRoles.developer) ||
    findRole(member, adminRoles.founder))
    return true
  else
    return false
}

export const convertTimestamp = (timestamp: number, fullTime:boolean=true, onlyDate:boolean=false, onlyTime:boolean=false) => {
  const date = new Date(timestamp * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const dateNumb = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayname = days[date.getDay()];

  const formatTime = (waktu: number) => {
    if (waktu > 10) return waktu;
    else return `0${waktu}`;
  }

  let time = '';
  if (fullTime) {
    time = `${dayname}, ${formatTime(dateNumb)} ${month} ${year}, ${formatTime(hour)}:${formatTime(min)}:${formatTime(sec)}`;
  } else if (onlyDate) {
    time = `${dayname}, ${formatTime(dateNumb)} ${month} ${year}`;
  } else if (onlyTime) {
    time = `${formatTime(hour)}:${formatTime(min)}:${formatTime(sec)}`;
  }
    
  return time;
}

export const trim = (str: string, max: number) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);