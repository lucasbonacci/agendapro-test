package com.seniortestmobile

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeviceInfoModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val context = reactContext

  override fun getName(): String {
    return "DeviceInfoModule"
  }

  @ReactMethod
  fun getBatteryLevel(promise: Promise) {
    try {
      val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
      val batteryStatus: Intent? = context.registerReceiver(null, filter)
      val level = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
      promise.resolve(level)
    } catch (e: Exception) {
      promise.reject("BATTERY_ERROR", "Battery level unavailable", e)
    }
  }

  @ReactMethod
  fun getDeviceModel(promise: Promise) {
    try {
      promise.resolve(Build.MODEL)
    } catch (e: Exception) {
      promise.reject("MODEL_ERROR", "Device model unavailable", e)
    }
  }

  @ReactMethod
  fun getOSVersion(promise: Promise) {
    try {
      promise.resolve("Android ${Build.VERSION.RELEASE}")
    } catch (e: Exception) {
      promise.reject("OS_ERROR", "OS version unavailable", e)
    }
  }

  @ReactMethod
  fun getDeviceIdentifier(promise: Promise) {
    promise.resolve("Unavailable")
  }
}
