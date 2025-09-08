---
title: C# 协变与逆变
date: 2025-09-08 15:46:53
tags: ["C#"]
---

第一次接触 C# 的协变和逆变的时候，会有些懵，为什么in是逆变呢。“逆”到底和什么方向相反呢?
其实他们解决的问题很简单：解决类型的安全转换. 

## 函数的转换

为了演示，假定现在有两个类， Car 和 Vehicle, 其中 Car 继承 Vehicle.
```c#
public class Vehicle
{
    protected int speed = 0;

    public void Run(){
        Console.WriteLine($"Run with speed {speed} m/s");
    }
}

public class Car : Vehicle 
{
    public Car()
    {
        speed = 10;
    }

    public void Honk()
    {
        Console.WriteLine("The car pressed the horn.");
    }
}
```

然后假定我想要一个函数 HandleCar， 可以接收一个 Car 作为入参.
那我们实现的时候能否传入一个通用的处理 Vehicle 的函数吗？

试想，delegate 在运行的时候会接收一个 Car，具体是 myDelegate 来处理。
而 Car 是可以很安全的转换为 Vehicle.
```
public delegate void HandleCar(Car car);
HandleCar myDelegate = (Vehicle vehicle) => vehicle.Run();
```

## 逆变
事实上上面的代码会提示无法转换类型，我们必须借助泛型。
```C#
Action<Vehicle> handleVe = (Vehicle vehicle) => vehicle.Run();
Action<Car> handleCar = handleVe;
handleCar(new Car());
```

我们必须显示的告诉编译器，类型 T 是作为参数的，而不是返回结果，所以需要在前面加上 in 关键字。可以看 Action 的源码已经给我们添加了：

```c#
public delegate void Action<in T>(T obj);
```

逆变的概念来自于范畴论，逆是说：Car 属于 Vehicle，但是 `Action<Vehicle>` 属于 `Action<Car>`，这个方向相反了。

## 协变

如果我们思考下可以得知，返回值是和参数相反的，称为协变.

```c#
Func<Car> GetCar = () => new Car();
Func<Vehicle> GetVehicle = Get();
```
## 总结

我们可以得出几个结论

- 泛型才支持逆变与协变
- 逆变与协变本质是为了类型的安全转换
    - 子类型可以安全的转换为父类型
    - 但是父类型不能安全转为子类型


