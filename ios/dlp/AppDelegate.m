/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "MTA.h"
#import "MTAConfig.h"
#import "XGPush.h"
#import "XGSetting.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTLinkingManager.h>

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0

#import <UserNotifications/UserNotifications.h>
@interface AppDelegate() <UNUserNotificationCenterDelegate>
@end
#endif

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];
  // jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.210:8081/index.ios.bundle?platform=ios&dev=true"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"dlp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [MTA startWithAppkey:@"Aqc1105656193"];  
  //信鸽
  [[XGSetting getInstance] enableDebug:YES];
	[XGPush startApp:2200022728 appKey:@"IMJ34Y25JN4I"];

	[XGPush isPushOn:^(BOOL isPushOn) {
		NSLog(@"[XGDemo] Push Is %@", isPushOn ? @"ON" : @"OFF");
	}];

	[self registerAPNS];

	[XGPush handleLaunching:launchOptions successCallback:^{
		NSLog(@"[XGDemo] Handle launching success");
	} errorCallback:^{
		NSLog(@"[XGDemo] Handle launching error");
	}];



  return YES;
}



- (void)applicationWillResignActive:(UIApplication *)application {
	// Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
	// Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
	// Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
	// If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
	// Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
	// Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
	// Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {

	NSString *deviceTokenStr = [XGPush registerDevice:deviceToken account:nil successCallback:^{
		NSLog(@"[XGDemo] register push success");
	} errorCallback:^{
		NSLog(@"[XGDemo] register push error");
	}];
	NSLog(@"[XGDemo] device token is %@", deviceTokenStr);
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
	NSLog(@"[XGDemo] register APNS fail.\n[XGDemo] reason : %@", error);
}


/**
 收到通知的回调

 @param application  UIApplication 实例
 @param userInfo 推送时指定的参数
 */
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
	NSLog(@"[XGDemo] receive Notification");
	[XGPush handleReceiveNotification:userInfo
	successCallback:^{
		 NSLog(@"[XGDemo] Handle receive success");
	 } errorCallback:^{
		 NSLog(@"[XGDemo] Handle receive error");
	 }];
}


/**
 收到静默推送的回调

 @param application  UIApplication 实例
 @param userInfo 推送时指定的参数
 @param completionHandler 完成回调
 */
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
	NSLog(@"[XGDemo] receive slient Notification");
	NSLog(@"[XGDemo] userinfo %@", userInfo);
	[XGPush handleReceiveNotification:userInfo
	successCallback:^{
		NSLog(@"[XGDemo] Handle receive success");
	} errorCallback:^{
		NSLog(@"[XGDemo] Handle receive error");
	}];

	completionHandler(UIBackgroundFetchResultNewData);
}

// iOS 10 新增 API
// iOS 10 会走新 API, iOS 10 以前会走到老 API
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
// App 用户点击通知的回调
// 无论本地推送还是远程推送都会走这个回调
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler {
	NSLog(@"[XGDemo] click notification");
	[XGPush handleReceiveNotification:response.notification.request.content.userInfo
	successCallback:^{
		 NSLog(@"[XGDemo] Handle receive success");
	 } errorCallback:^{
		 NSLog(@"[XGDemo] Handle receive error");
	 }];

	completionHandler();
}

// App 在前台弹通知需要调用这个接口
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {

	completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert);
}
#endif

- (void)registerAPNS {
	float sysVer = [[[UIDevice currentDevice] systemVersion] floatValue];
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
	if (sysVer >= 10) {
		// iOS 10
		[self registerPush10];
	} else if (sysVer >= 8) {
		// iOS 8-9
		[self registerPush8to9];
	} else {
		// before iOS 8
		[self registerPushBefore8];
	}
#else
	if (sysVer < 8) {
		// before iOS 8
		[self registerPushBefore8];
	} else {
		// iOS 8-9
		[self registerPush8to9];
	}
#endif
}

- (void)registerPush10{
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
	UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
	center.delegate = self;


	[center requestAuthorizationWithOptions:UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert completionHandler:^(BOOL granted, NSError * _Nullable error) {
		if (granted) {
		}
	}];
	[[UIApplication sharedApplication] registerForRemoteNotifications];
#endif
}

- (void)registerPush8to9{
	UIUserNotificationType types = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
	UIUserNotificationSettings *mySettings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
	[[UIApplication sharedApplication] registerUserNotificationSettings:mySettings];
	[[UIApplication sharedApplication] registerForRemoteNotifications];
}

- (void)registerPushBefore8{
	[[UIApplication sharedApplication] registerForRemoteNotificationTypes:(UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound)];
}



- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}


@end
