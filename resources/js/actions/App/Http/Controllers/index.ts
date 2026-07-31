import Public from './Public'
import Auth from './Auth'
import Admin from './Admin'
import Student from './Student'
import NotificationController from './NotificationController'
import ProfileController from './ProfileController'

const Controllers = {
    Public: Object.assign(Public, Public),
    Auth: Object.assign(Auth, Auth),
    Admin: Object.assign(Admin, Admin),
    Student: Object.assign(Student, Student),
    NotificationController: Object.assign(NotificationController, NotificationController),
    ProfileController: Object.assign(ProfileController, ProfileController),
}

export default Controllers