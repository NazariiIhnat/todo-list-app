<h1>Todo list application README</h1>

<h2>Overview</h2>
This application is designed to help you manage your tasks efficiently. It's built using HTML, CSS, TypeScript, Angular, and Firebase, providing a seamless user experience for managing your tasks.

<h2><a href="https://ihnat-todo.netlify.app">Try it online</a></h2>
You can login using email test@gmail.com and password 123123 or signup using your own email and password.

<h2>Features</h2>
<ol>
  <li><b>User Authentication: </b>The application offers a secure login and signup system,
    ensuring the privacy of user data.
    Input validation is implemented to ensure that only valid data is accepted during the authentication process.</li>
  <li><b>Logout: </b>Users can easily log out from the application with a single click,
    ensuring their data's security.</li>
  <li><b>Task Creation with Validation: </b>A modal window with a user-friendly form allows
    for creating new tasks.
    User input is thoroughly validated to prevent errors and ensure accurate task information.</li>
  <li><b>Intuitive Task Display: </b>The application boasts a clean and visually appealing
    interface for displaying tasks.</li>
  <li><b>Task Management: </b>Users have the ability to delete tasks they no longer need.
    The update feature lets users modify task details according to their changing requirements.
    Tasks' status can be updated to reflect their progress.
    Tasks can be marked as important for better prioritization.</li>
  <li><b>Category Creation: </b>Users can categorize their tasks to keep them organized and
    easy to locate.</li>
  <li><b>Category Filtering: </b>A filtering mechanism is in place to allow users to view
    tasks based on specific categories.</li>
  <li><b>Sorting Options: </b>The application offers a range of sorting options, including:
    Alphabetical sorting in ascending and descending order.
    Priority-based sorting, with completed or uncompleted tasks displayed first.
    Date-based sorting in ascending and descending order.</li>
  <li><b>Task Searching: </b>Users can quickly find tasks by searching for keywords in the
    task title.</li>
  <li><b>Automatic login: </b>The application automatically login if user refresh page. Autologin happens only if user did not logout and last login was less than an hour ago.
  </li>
  <li><b>Automatic logout:</b> The application automatically logout user after one hour.</li>
  <li><b>Category edit:</b> User can edit category name and application automatically change name in relative tasks.</li>
  <li><b>Category delete:</b> User can delete category with two options. The first optin allow user to delete category only and all relative to this category tasks will have no category. The second option will delete category and relative tasks.</li>
</ol>

<h2>Screenshots</h2>
<ol>
  <li>
    Input validation.
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/1.png" alt="Message when user created image">
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/1.1.png" alt="Message when user login fail image">
  </li>
  
  <li>
    Task add interface.
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/2.png" alt="Task add form image">
  </li>

  <li>
    Application interface.
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/3.png" alt="Application interface image">
  </li>

  <li>
    Created new categories(Work, Home, Other, Sport).
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/4.png" src="New categories image">
  </li>

  <li>
    Add task interface after new categories add.
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/5.png" alt="Add task interface after new categories add image">
  </li>

  <li>
    The way categories of each task are displayed in application interface.
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/6.png" alt="Dispay of each task category in application interface image">
  </li>

  <li>
    Task sorting.
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/7.png" alt="Task sorting image">
  </li>

  <li>
    Task searching
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/8.png">
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/9.png">
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/10.png">
  </li>
  <li>
    Buttons of category update and delete apears on selected category. This buttons apears only on user created categories.
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/11.png">
  </li>
  <li>
    Category update dialog
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/12.png">
  </li>
  <li>
    Category delete dialog
    <img src="https://github.com/NazariiIhnat/todo-list-app/blob/master/screenshots/13.png">
  </li>
</ol>

<h2>Bugs to fix</h2>
<ul>
  <li>Fix container, that appears when user input data in search input. Now it is scrolling down, when user scroll down.</li>
  <li>When user refresh page of application on netlify, the error occuresed.</li>
  <li>Sort option (if selected) don't work after category rename. User must reselect sort option (different than previously selected).</li>
</ul>

<h2>Upcoming features</h2>
<ol>
  <li>Custom color for category font and background.</li>
  <li>Make categories container x-axis scrollable when category name to long.</li>
  <li>Make application responsive.</li>
  <li>Add user name and surname.</li>
  <li>Ability to create groups and invite users.</li>
  <li>Send tasks to users in group.</li>
  <li>Display sent/recived tasks.</li>
</ol>
