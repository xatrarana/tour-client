import AlertDialogContainer from "../places/confirm.Dialog";
type UserActionButtonsProps = {
  userId: string,
  action?: 'UPDATE' | 'DELETE'
}
const UserActionButtons: React.FC<UserActionButtonsProps> = ({userId}) => {
  return (
     <AlertDialogContainer path={`/users/delete/ad/${userId}`} redirect="/users"/>
  )
}

export default UserActionButtons