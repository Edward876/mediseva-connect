
export interface Appointment {
  id: string;
  doctor: {
    id: number;
    name: string;
    specialty: string;
    avatar: string;
    hospital: string;
  };
  date: string;
  time: string;
  type: "Virtual" | "In-person";
  location: string;
  status: "Confirmed" | "Completed" | "Cancelled";
}

export const saveAppointment = (appointment: Appointment) => {
  const appointments = getAppointments();
  appointments.push(appointment);
  localStorage.setItem('mediseva_appointments', JSON.stringify(appointments));
};

export const getAppointments = (): Appointment[] => {
  const appointments = localStorage.getItem('mediseva_appointments');
  return appointments ? JSON.parse(appointments) : [];
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
  const appointments = getAppointments();
  const updatedAppointments = appointments.map(apt => 
    apt.id === id ? { ...apt, status } : apt
  );
  localStorage.setItem('mediseva_appointments', JSON.stringify(updatedAppointments));
};
