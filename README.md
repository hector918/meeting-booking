## Repository

- Backend repo [https://github.com/hector918/blackstone-backend](https://github.com/hector918/blackstone-backend).
- Frontend repo [https://github.com/hector918/meeting-booking](https://github.com/hector918/meeting-booking).

## Functionality

1. **View All Meeting Rooms:**

   - _Description:_ Users can view a list of all available meeting rooms on the Home page. These meeting rooms are essential for booking meetings.
   - _Functionality:_ Display a list of meeting rooms with details such as name, capacity, and floor.

2. **View Single Meeting Room Details:**

   - _Description:_ Users can access the details of a specific meeting room by clicking on a room from the list on the Home page. This allows them to make informed decisions when booking.
   - _Functionality:_ Display the details of the selected meeting room, including its name, capacity, and floor. Additionally, list all future bookings for that room.

3. **Book Meeting Room:**

   - _Description:_ Users can book a meeting room by providing details about their meeting. This is a core function for scheduling meetings.
   - _Functionality:_ Present a booking form where users can enter the meeting name, start date, end date, and attendees (optional). Validate the input and provide success or error messages upon submission.

4. **View All Bookings:**

   - _Description:_ Users can view a list of all future bookings for all meeting rooms on the "Bookings" page. This provides an overview of upcoming meetings.
   - _Functionality:_ Display a list of all future bookings, including meeting names, start dates, and end dates. Allow users to click on a booking for more details.

5. **View Single Booking Details:**

   - _Description:_ Users can access the details of a specific booking by clicking on a booking from the list on the "Bookings" page.
   - _Functionality:_ Display the details of the selected booking, including the meeting name, start date, and end date. Provide a button to cancel the booking and prompt for confirmation.

6. **Create New Meeting Room (Admin):**

   - _Description:_ Administrators can create new meeting rooms to expand the available options for users.
   - _Functionality:_ Provide a form for administrators to enter the name, capacity, and floor of a new meeting room. Validate input and show success or error messages.

7. **Filter Available Meeting Rooms (Admin, Extra Challenge):**

   - _Description:_ Administrators can filter available meeting rooms based on search criteria to find a suitable room for a meeting quickly.
   - _Functionality:_ Display a search form with fields for start date, end date, floor, and capacity. Filter and display only the available rooms that match the search criteria.

8. **Cancel Booking (Admin):**
   - _Description:_ Administrators have the ability to cancel bookings, which can be useful when changes or cancellations are necessary.
   - _Functionality:_ Provide a cancel button on the booking details page. Prompt the administrator for confirmation before canceling the booking.

---

## Screenshots

1. The landing page of the Meeting Room Booking App, serving as the initial interface for users.
   ![landing page](./screenshots/Screenshot%202023-10-31%20at%209.07.05 PM.png)
2. The login page where users can log in to their accounts.
   ![login page](./screenshots/Screenshot%202023-10-31%20at%209.07.10 PM.png)
3. The page users are directed to after logging in successfully.
   ![landing after login page](./screenshots/Screenshot%202023-10-31%20at%209.07.19 PM.png)
4. The Home page where users can view a list of available meeting rooms and may use a search form.
   ![home page/ room listing and search page](./screenshots/Screenshot%202023-10-31%20at%209.07.22 PM.png)
5. The page dedicated to a specific meeting room, displaying room details and future bookings.
   ![single room page](./screenshots/Screenshot%202023-10-31%20at%209.07.36 PM.png)
6. The page dedicated to a specific booking, showing meeting details and options to cancel the booking.
   ![single booking page](./screenshots/Screenshot%202023-10-31%20at%209.07.39 PM.png)
7. A modal dialog for confirming the cancellation of a booking.
   ![cancel booking modal](./screenshots/Screenshot%202023-10-31%20at%209.07.42 PM.png)
8. The page for creating a new meeting room, allowing administrators to add details of the room.
   ![create new room page](./screenshots/Screenshot%202023-10-31%20at%209.07.50 PM.png)
