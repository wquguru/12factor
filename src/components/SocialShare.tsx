'use client';

import { useState, useEffect } from 'react';

interface SocialShareProps {
  className?: string;
}

export default function SocialShare({ className = '' }: SocialShareProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动端
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Twitter 关注处理函数
  const handleTwitterFollow = () => {
    const twitterUrl = 'https://twitter.com/intent/follow?screen_name=wquguru';
    
    if (isMobile) {
      // 移动端尝试唤起Twitter App，如果没有安装则回退到网页
      try {
        window.location.assign(`twitter://user?screen_name=wquguru`);
        setTimeout(() => {
          window.location.assign(twitterUrl);
        }, 1000);
      } catch {
        window.location.assign(twitterUrl);
      }
    } else {
      // 桌面端在新窗口打开
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
  };

  // 社交平台配置 - X (Twitter) 关注按钮
  const getSocialPlatforms = () => {
    return [
      { 
        name: 'X', 
        iconType: 'svg' as const,
        iconPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
        handle: () => handleTwitterFollow()
      }
    ];
  };

  const socialPlatforms = getSocialPlatforms();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {socialPlatforms.map((platform) => (
        <button
          key={platform.name}
          onClick={platform.handle}
          className="p-2 text-t2 hover:text-info hover:bg-info-wash rounded-full transition-all duration-200"
          title={`Follow @wquguru on ${platform.name}`}
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d={platform.iconPath} />
          </svg>
        </button>
      ))}
    </div>
  );
}
