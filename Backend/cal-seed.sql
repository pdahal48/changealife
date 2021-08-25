
\c cal

INSERT INTO users
  (
    username, 
    password, 
    fullName, 
    city, 
    state, 
    age, 
    highlight, 
    bio, 
    phone, email, shelter, is_admin, is_creator)
VALUES
    (
      'jerry50',
      'password',
      'Jerry Brown', 
      'Hamilton', 
      'Ohio',
      '35',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
     'Nunc vel risus commodo viverra maecenas accumsan. Imperdiet dui accumsan sit amet. Malesuada bibendum arcu vitae elementum 
     curabitur vitae nunc sed. Senectus et netus et malesuada fames. Enim neque volutpat ac tincidunt vitae. Et malesuada fames ac 
     turpis. Fringilla phasellus faucibus scelerisque eleifend donec. Iaculis nunc sed augue lacus. Est pellentesque elit ullamcorper 
     dignissim cras tincidunt. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Nunc aliquet bibendum enim facilisis 
     gravida neque convallis. Pellentesque pulvinar pellentesque habitant morbi. Consectetur lorem donec massa sapien faucibus. 
     Suspendisse potenti nullam ac tortor vitae purus. Scelerisque in dictum non consectetur a erat nam. Augue ut lectus arcu bibendum 
     at varius. A erat nam at lectus. Odio pellentesque diam volutpat commodo sed egestas. Imperdiet sed euismod nisi porta lorem mollis 
     aliquam ut.',
      7200001215,
      'jerry@gmail.com',
      'Hamilton Christ Shelter',
      FALSE,
      FALSE
    ),
    (
      'pdahal48',
      'password',
      'Prem Dzongkhar', 
      'Hamilton', 
      'Ohio',
      '35',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
     'Nunc vel risus commodo viverra maecenas accumsan. Imperdiet dui accumsan sit amet. Malesuada bibendum arcu vitae elementum 
     curabitur vitae nunc sed. Senectus et netus et malesuada fames. Enim neque volutpat ac tincidunt vitae. Et malesuada fames ac 
     turpis. Fringilla phasellus faucibus scelerisque eleifend donec. Iaculis nunc sed augue lacus. Est pellentesque elit ullamcorper 
     dignissim cras tincidunt. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Nunc aliquet bibendum enim facilisis 
     gravida neque convallis. Pellentesque pulvinar pellentesque habitant morbi. Consectetur lorem donec massa sapien faucibus. 
     Suspendisse potenti nullam ac tortor vitae purus. Scelerisque in dictum non consectetur a erat nam. Augue ut lectus arcu bibendum 
     at varius. A erat nam at lectus. Odio pellentesque diam volutpat commodo sed egestas. Imperdiet sed euismod nisi porta lorem mollis 
     aliquam ut.',
      7200001212,
      'jerry@gmail.com',
      'Butler County Shelter',
      FALSE,
      FALSE
    ),
    (
      'juanita07',
      'password',
      'Juanita Brown', 
      'Hamilton', 
      'Ohio',
      '35',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
     'Nunc vel risus commodo viverra maecenas accumsan. Imperdiet dui accumsan sit amet. Malesuada bibendum arcu vitae elementum 
     curabitur vitae nunc sed. Senectus et netus et malesuada fames. Enim neque volutpat ac tincidunt vitae. Et malesuada fames ac 
     turpis. Fringilla phasellus faucibus scelerisque eleifend donec. Iaculis nunc sed augue lacus. Est pellentesque elit ullamcorper 
     dignissim cras tincidunt. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Nunc aliquet bibendum enim facilisis 
     gravida neque convallis. Pellentesque pulvinar pellentesque habitant morbi. Consectetur lorem donec massa sapien faucibus. 
     Suspendisse potenti nullam ac tortor vitae purus. Scelerisque in dictum non consectetur a erat nam. Augue ut lectus arcu bibendum 
     at varius. A erat nam at lectus. Odio pellentesque diam volutpat commodo sed egestas. Imperdiet sed euismod nisi porta lorem mollis 
     aliquam ut.',
      7200001212,
      'jerry@gmail.com',
      'Hamilton Christ Shelter',
      FALSE,
      FALSE
    ),
    (
      'lisa10',
      'password',
      'Lisa Thompson', 
      'Hamilton', 
      'Ohio',
      '35',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
     'Nunc vel risus commodo viverra maecenas accumsan. Imperdiet dui accumsan sit amet. Malesuada bibendum arcu vitae elementum 
     curabitur vitae nunc sed. Senectus et netus et malesuada fames. Enim neque volutpat ac tincidunt vitae. Et malesuada fames ac 
     turpis. Fringilla phasellus faucibus scelerisque eleifend donec. Iaculis nunc sed augue lacus. Est pellentesque elit ullamcorper 
     dignissim cras tincidunt. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Nunc aliquet bibendum enim facilisis 
     gravida neque convallis. Pellentesque pulvinar pellentesque habitant morbi. Consectetur lorem donec massa sapien faucibus. 
     Suspendisse potenti nullam ac tortor vitae purus. Scelerisque in dictum non consectetur a erat nam. Augue ut lectus arcu bibendum 
     at varius. A erat nam at lectus. Odio pellentesque diam volutpat commodo sed egestas. Imperdiet sed euismod nisi porta lorem mollis 
     aliquam ut.',
      7200001212,
      'jerry@gmail.com',
      'Hamilton Christ Shelter',
      FALSE,
      FALSE
  );

INSERT INTO shelter 
  (name, address, city, state, zip, phone)
VALUES
  ('Butler County Shelter', '1111 E. Main st', 'Hamilton', 'Ohio', 45011, 5130001111),
  ('Hamilton Christ Shelter', '1000 E. Broad st', 'Fairfield', 'Ohio', 45013, 5130002222);

INSERT INTO wishlist 
  (user_username, wish)
VALUES
  ('juanita07', 'cash'),
  ('juanita07', 'a warm jacket'),
  ('juanita07', 'Assistance apply for public benefits'),
  ('lisa10', 'cash'),
  ('lisa10', 'Place to stay for a while'),
  ('lisa10', 'Shoes'),
  ('pdahal48', 'cash'),
  ('pdahal48', 'some more cash'),
  ('pdahal48', 'more and more cash'),
  ('jerry50', 'cash'),
  ('jerry50', 'some more cash'),
  ('jerry50', 'more and more cash');

INSERT INTO images 
  (user_username, src)
VALUES
  ('juanita07', 'https://www.sbs.com.au/topics/sites/sbs.com.au.topics/files/homeless-walking-by.jpg'),
  ('lisa10', 'https://www.ppic.org/wp-content/uploads/people-living-on-street-in-los-angeles-640x287.jpg'),
  ('pdahal48', 'https://researchoutreach.org/wp-content/uploads/2019/05/shutterstock_1155406366.jpg'),
  ('jerry50', 'https://www.gannett-cdn.com/presto/2018/08/14/PCIN/e2793e4b-935e-4395-9353-6a75d9e46a7f-071718Homeless1.jpg');

INSERT INTO success_stories
  (user_username, src, story)
VALUES
  ('pdahal48', 'https://www.internationalworkplace.com/images/uploaded/homeless-person-with-willing-to-work-sign-1300pxs.jpg', 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
    magna aliqua. Eget egestas purus viverra accumsan in nisl nisi. Malesuada fames ac turpis egestas. Netus et 
    malesuada fames ac turpis egestas. A cras semper auctor neque vitae. Lectus nulla at volutpat diam ut venenatis 
    tellus. Vehicula ipsum a arcu cursus vitae congue. Consectetur libero id faucibus nisl. Tortor dignissim 
    convallis aenean et tortor at risus viverra adipiscing. Quis enim lobortis scelerisque fermentum dui faucibus. 
    Bibendum neque egestas congue quisque egestas diam in arcu cursus. Dictum varius duis at consectetur lorem donec 
    massa sapien. Velit scelerisque in dictum non consectetur. Fermentum iaculis eu non diam phasellus. 
    Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Rhoncus est pellentesque elit ullamcorper. 
    Est ante in nibh mauris cursus mattis molestie a iaculis. Leo in vitae turpis massa sed elementum tempus egestas. 
    Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum.'),
  ('jerry50', 'https://i.guim.co.uk/img/media/a94259b9cb8a4c953ee10918b1606cc5554d179a/0_43_3186_1912/master/3186.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=fcbee5315562d570260c1cfe4dc4e99f', 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
    magna aliqua. Eget egestas purus viverra accumsan in nisl nisi. Malesuada fames ac turpis egestas. 
    Netus et malesuada fames ac turpis egestas. A cras semper auctor neque vitae. Lectus nulla at volutpat 
    diam ut venenatis tellus. Vehicula ipsum a arcu cursus vitae congue. Consectetur libero id faucibus nisl. 
    Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Quis enim lobortis scelerisque fermentum 
    dui faucibus. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Dictum varius duis at consectetur 
    lorem donec massa sapien. Velit scelerisque in dictum non consectetur. Fermentum iaculis eu non diam phasellus. 
    Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Rhoncus est pellentesque elit ullamcorper. Est ante in 
    nibh mauris cursus mattis molestie a iaculis. Leo in vitae turpis massa sed elementum tempus egestas. 
    Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum.');

INSERT INTO shelter_users 
  (user_username, shelter_name)
VALUES
  ('juanita07', 'Butler County Shelter'),
  ('lisa10', 'Hamilton Christ Shelter'),
  ('pdahal48', 'Hamilton Christ Shelter'),
  ('jerry50', 'Hamilton Christ Shelter');