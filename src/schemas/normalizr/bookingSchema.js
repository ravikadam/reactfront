import { schema } from 'normalizr'

const studentSchema = new schema.Entity('student')
const tutorSchema = new schema.Entity('tutor')

const sessionMasterSchema = new schema.Entity('session_master')
const actvitiesSchema = new schema.Entity('activities')
const sessionSchema = new schema.Entity('session', {
  session_master: sessionMasterSchema,
  activities: [actvitiesSchema]
})

const slotsScehma = new schema.Entity('slot')
const bookingSchema = new schema.Entity('booking', {
  tutor: tutorSchema,
  student: studentSchema,
  slot: slotsScehma,
  session: sessionSchema
})

export { bookingSchema }
