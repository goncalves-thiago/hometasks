import {format} from 'date-fns';

// API URL
export const API_URL = "https://api.hometasks.com.br";
//export const API_URL = "http://127.0.0.1:8000";

// Get initials letters from name
export function nameInitials(name) {
  if(name) {
    const nameArray = name.split(" ");
    const aux = nameArray.length;
    const initials = nameArray[0].charAt(0) + nameArray[aux - 1].charAt(0);
    
    return initials;
  }
}

// Check if task is expirated
export function isExpirated({task}) {
  const today = new Date();
  if ((task.status === "pending" || task.status === "inProgress") && (task.deadline < format(today, 'yyyy-MM-dd'))) return true;
  else return false;
}

// Check if task is completed
export function isCompleted({task}) {
  if (task.status === "completed") return true;
  else return false;
}

// Check if task is inReview
export function isInReview({task}) {
  if (task.status === "inReview") return true;
  else return false;
}

// Check if task is inProgress
export function isInProgress({task}) {
  if (task.status === "inProgress") return true;
  else return false;
}

// Check if task is pending
export function isPending({task}) {
  if (task.status === "pending") return true;
  else return false;
}

// Check if the user has a family
export function hasFamily(userData) {
  if(userData.familyId) return true;
  else return false;
}

// Objects for color rending
export const statusColor = {
    "pending": "text-pending",
    "inProgress": "text-inprogress",
    "inReview": "text-review",
    "completed": "text-completed",
    "expired": "text-expired",
  };
  
export const badgeColor = {
    "pending": "badge-pending",
    "inProgress": "badge-inprogress",
    "inReview": "badge-inreview",
    "completed": "badge-completed",
    "expired": "badge-expired",
  };
  
export const statusName = {
    "pending": "Pendente",
    "inProgress": "Iniciado",
    "inReview": "Revisão",
    "completed": "Completado",
    "expired": "Expirado",
  };