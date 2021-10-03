# WhiteWebWorld
A DNS server that is simple and easy to manage.

---
|

|

---


Origin: adburner-dns

---
|

|

---

This is following stanardjs with the following rule turned off in the [config](https://stackoverflow.com/a/36189032)
```json
...
  "rules": {
    "react/jsx-key": 0
  }
```

---
|

|

---

# Bugs
Disconnect the network to reproduce
```
node:internal/errors:464
    ErrorCaptureStackTrace(err);
    ^

Error: send ENETUNREACH 192.168.8.114:57277
    at doSend (node:dgram:714:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:454:18)
    at afterDns (node:dgram:660:5)
    at processTicksAndRejections (node:internal/process/task_queues:84:21)
    at runNextTicks (node:internal/process/task_queues:65:3)
    at listOnTimeout (node:internal/timers:526:9)
    at processTimers (node:internal/timers:500:7) {
  errno: -51,
  code: 'ENETUNREACH',
  syscall: 'send',
  address: '192.168.8.114',
  port: 57277
}
```