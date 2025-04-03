//
//  DeviceInfoModule.swift
//  SeniorTestMobile
//
//  Created by lucas bonacci on 02/04/2025.
//

import Foundation
import UIKit
import React

@objc(DeviceInfoModule)
class DeviceInfoModule: NSObject {

  override init() {
    super.init()
    UIDevice.current.isBatteryMonitoringEnabled = true
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false 
  }

  @objc
  func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock,
                       rejecter reject: @escaping RCTPromiseRejectBlock) {
    let batteryLevel = UIDevice.current.batteryLevel

    guard batteryLevel >= 0 else {
      reject("BATTERY_ERROR", "Battery level unavailable", nil)
      return
    }

    resolve(Int(batteryLevel * 100))
  }

  @objc
  func getDeviceModel(_ resolve: RCTPromiseResolveBlock,
                      rejecter reject: RCTPromiseRejectBlock) {
    resolve(UIDevice.current.model)
  }

  @objc
  func getOSVersion(_ resolve: RCTPromiseResolveBlock,
                    rejecter reject: @escaping RCTPromiseRejectBlock) {
    let device = UIDevice.current
    let systemName = device.systemName
    let systemVersion = device.systemVersion
    resolve("\(systemName) \(systemVersion)")
  }

  @objc
  func getDeviceIdentifier(_ resolve: RCTPromiseResolveBlock,
                           rejecter reject: @escaping RCTPromiseRejectBlock) {
    var systemInfo = utsname()
    uname(&systemInfo)
    let machineMirror = Mirror(reflecting: systemInfo.machine)
    let identifier = machineMirror.children.reduce("") { identifier, element in
      guard let value = element.value as? Int8, value != 0 else { return identifier }
      return identifier + String(UnicodeScalar(UInt8(value)))
    }

    resolve(identifier)
  }
}
