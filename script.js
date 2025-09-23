
(function() {
    'use strict';
    
    const createUI = () => {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: white;
            min-width: 300px;
            backdrop-filter: blur(10px);
        `;

        const title = document.createElement('h3');
        title.textContent = 'Bypass Status';
        title.style.cssText = `
            margin: 0 0 15px 0;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        `;

        const statusBox = document.createElement('div');
        statusBox.style.cssText = `
            background: rgba(255,255,255,0.15);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            border-left: 4px solid #ff6b6b;
        `;

        const statusText = document.createElement('p');
        statusText.innerHTML = `
            <strong>Bypass not working now</strong><br>
            <span style="font-size: 14px; opacity: 0.9;">We are too busy to update</span>
        `;
        statusText.style.cssText = `
            margin: 0;
            line-height: 1.4;
        `;

        const videoSection = document.createElement('div');
        videoSection.style.cssText = `
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
        `;

        const videoTitle = document.createElement('p');
        videoTitle.textContent = 'You can use bypass from dyrian in this video:';
        videoTitle.style.cssText = `
            margin: 0 0 10px 0;
            font-size: 14px;
            opacity: 0.9;
        `;

        const videoEmbed = document.createElement('iframe');
        videoEmbed.src = 'https://www.youtube.com/embed/W6WYHplcBqI';
        videoEmbed.style.cssText = `
            width: 100%;
            height: 180px;
            border: none;
            border-radius: 6px;
            margin-bottom: 10px;
        `;

        const linkContainer = document.createElement('div');
        linkContainer.style.cssText = `
            display: flex;
            gap: 10px;
        `;

        const watchButton = document.createElement('a');
        watchButton.href = 'https://www.youtube.com/watch?v=W6WYHplcBqI';
        watchButton.target = '_blank';
        watchButton.textContent = 'Watch on YouTube';
        watchButton.style.cssText = `
            background: #ff4757;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.3s ease;
            flex: 1;
            text-align: center;
        `;

        const embedButton = document.createElement('button');
        embedButton.textContent = 'Toggle Embed';
        embedButton.style.cssText = `
            background: #3742fa;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
        `;

        const closeButton = document.createElement('button');
        closeButton.textContent = '✕';
        closeButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s ease;
        `;

        watchButton.addEventListener('mouseenter', () => {
            watchButton.style.background = '#ff3838';
            watchButton.style.transform = 'translateY(-1px)';
        });

        watchButton.addEventListener('mouseleave', () => {
            watchButton.style.background = '#ff4757';
            watchButton.style.transform = 'translateY(0)';
        });

        embedButton.addEventListener('mouseenter', () => {
            embedButton.style.background = '#2f3542';
            embedButton.style.transform = 'translateY(-1px)';
        });

        embedButton.addEventListener('mouseleave', () => {
            embedButton.style.background = '#3742fa';
            embedButton.style.transform = 'translateY(0)';
        });

        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.background = 'rgba(255,255,255,0.3)';
        });

        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.background = 'rgba(255,255,255,0.2)';
        });

        embedButton.addEventListener('click', () => {
            videoEmbed.style.display = videoEmbed.style.display === 'none' ? 'block' : 'none';
        });

        closeButton.addEventListener('click', () => {
            container.remove();
        });

        statusBox.appendChild(statusText);
        videoSection.appendChild(videoTitle);
        videoSection.appendChild(videoEmbed);
        linkContainer.appendChild(watchButton);
        linkContainer.appendChild(embedButton);
        videoSection.appendChild(linkContainer);
        
        container.appendChild(closeButton);
        container.appendChild(title);
        container.appendChild(statusBox);
        container.appendChild(videoSection);

        document.body.appendChild(container);

        setTimeout(() => {
            container.style.animation = 'slideInRight 0.5s ease-out';
        }, 100);
    };

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createUI);
    } else {
        createUI();
    }
})();
/**
*   ,----..                                                               
*  /   /   \                                                              
* |   :     :                                                             
* .   |  ;. /                                                             
* .   ; /--`    ,--.--.        .--,                                       
* ;   | ;  __  /       \     /_ ./|                                       
* |   : |.' .'.--.  .-. | , ' , ' :                                       
* .   | '_.' : \__\/: . ./___/ \: |                                       
* '   ; : \  | ," .--.; | .  \  ' |                                       
* '   | '/  .'/  /  ,.  |  \  ;   :                                       
* |   :    / ;  :   .'   \  \  \  ;                                       
*  \   \ .'  |  ,     .-./   :  \  \                                      
*   `---`     `--`---'        \  ' ;                                      
*   .--.--.         ,-.        `--`                                       
*  /  /    '.   ,--/ /|   ,--,         ,---,      ,---,                   
* |  :  /`. / ,--. :/ | ,--.'|       ,---.'|    ,---.'|            __  ,-.
* ;  |  |--`  :  : ' /  |  |,        |   | :    |   | :          ,' ,'/ /|
* |  :  ;_    |  '  /   `--'_        |   | |    |   | |   ,---.  '  | |' |
*  \  \    `. '  |  :   ,' ,'|     ,--.__| |  ,--.__| |  /     \ |  |   ,'
*   `----.   \|  |   \  '  | |    /   ,'   | /   ,'   | /    /  |'  :  /  
*   __ \  \  |'  : |. \ |  | :   .   '  /  |.   '  /  |.    ' / ||  | '   
*  /  /`--'  /|  | ' \ \'  : |__ '   ; |:  |'   ; |:  |'   ;   /|;  : |   
* '--'.     / '  : |--' |  | '.'||   | '/  '|   | '/  ''   |  / ||  , ;   
*   `--'---'  ;  |,'    ;  :    ;|   :    :||   :    :||   :    | ---'    
*             '--'      |  ,   /  \   \  /   \   \  /   \   \  /          
*                        ---`-'    `----'     `----'     `----'           
*/
