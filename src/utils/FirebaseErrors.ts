export const FirebaseErrors = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "This scroll was not found in the guild's archives.";
    case "auth/invalid-email":
      return "This scroll bears invalid magical runes.";
    case "auth/too-many-requests":
      return "The arcane gateway is overwhelmed. Rest before trying again.";
    case "auth/email-already-in-use":
      return "This scroll is already bound to another guild member.";
    case "auth/weak-password":
      return "Your sigil is too weak. Empower it with more magical runes.";
    case "auth/wrong-password":
      return "Your sigil was rejected by the guild's magical wards.";
    case "auth/user-disabled":
      return "Your guild membership has been suspended by the Council.";
    case "auth/operation-not-allowed":
      return "This magical ritual is forbidden in these lands.";
    default:
      return "The arcane winds have disturbed our magic. Please try the ritual again.";
  }
};
