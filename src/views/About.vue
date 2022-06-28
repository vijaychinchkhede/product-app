<template>
  <div class="about">
    <div class="divider"><span></span><span>About Us</span><span></span></div>
    <div>
      <p>Lorem Ipsum !!!:</p>
      <p>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam magna urna, iaculis et magna eget, tempus eleifend ipsum. Sed bibendum purus quis iaculis suscipit. Maecenas sed neque turpis. Curabitur a nisl faucibus, pretium purus et, sodales lectus. Aliquam nunc purus, venenatis nec elit nec, posuere porta justo. Nam facilisis odio ac eros sollicitudin elementum eget nec turpis. Suspendisse tristique erat sed nulla auctor, sit amet posuere purus mattis. Maecenas ultricies sagittis lacus, non finibus diam. Morbi tempus lectus quis turpis euismod finibus. Quisque rutrum, est eget faucibus ultricies, velit sapien consequat lectus, finibus ullamcorper magna nisi nec massa. Donec eget lobortis leo.
          </li>
          
        </ul>
      </p>
    </div>
  </div>
</template>
<style type="text/css">
    /*body { background: #FCF; }*/
        
        .divider {                /* minor cosmetics */
            display: table; 
            font-size: 24px; 
            text-align: center; 
            width: 75%;             /* divider width */
            margin: 40px auto;          /* spacing above/below */
        }
        .divider span { display: table-cell; position: relative; }
        .divider span:first-child, .divider span:last-child {
            width: 50%;
            top: 13px;              /* adjust vertical align */
            -moz-background-size: 100% 2px;   /* line width */
            background-size: 100% 2px;      /* line width */
            background-position: 0 0, 0 100%;
            background-repeat: no-repeat;
        }
        .divider span:first-child {       /* color changes in here */
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(transparent), to(#000));
            background-image: -webkit-linear-gradient(180deg, transparent, #000);
            background-image: -moz-linear-gradient(180deg, transparent, #000);
            background-image: -o-linear-gradient(180deg, transparent, #000);
            background-image: linear-gradient(90deg, transparent, #000);
        }
        .divider span:nth-child(2) {
            color: #000; padding: 0px 5px; width: auto; white-space: nowrap;
        }
        .divider span:last-child {        /* color changes in here */
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#000), to(transparent));
            background-image: -webkit-linear-gradient(180deg, #000, transparent);
            background-image: -moz-linear-gradient(180deg, #000, transparent);
            background-image: -o-linear-gradient(180deg, #000, transparent);
            background-image: linear-gradient(90deg, #000, transparent);
        }
</style>