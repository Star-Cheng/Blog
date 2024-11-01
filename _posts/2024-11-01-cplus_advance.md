---
layout: post
title: "C++核心编程"
date:   2024-11-01
tags: [C++]
comments: true
author: starcheng
---

###### 说明：本教程适用于C++初学者的小白, 内容主要是个人总结的一些个人学习笔记, 仅供参考

<!-- more -->

### C++核心编程

## 1. 内存分区模型

- 代码区: 存放代码, 特点: 共享, 可读
- 全局区: 全局变量、静态变量、全局const常量和字符串常量存放于此, 该区域的数据在程序结束之后由操作系统释放
- 栈区: 有编译器自动分配释放, 存放函数的参数值, 局部变量, 不要返回局部变量的地址
- 堆区: 有程序员分配释放, 若程序员不是放, 程序结束时由操作系统回收, 利用new开辟堆区空间, 利用delete释放堆区空间

## 2. 引用

### 2.1 引用的基本使用

1. 作用: 给变量起别名
2. 语法: 数据类型 &别名 = 原名

```C++
#include <iostream>
using namespace std;
int main()
{
    int a = 10;
    int &b = a;
    cout << a << endl;
    cout << b << endl;
    b = 20;
    cout << a << endl;
    cout << b << endl;
    return 0;
}
```

### 2.2 引用的注意事项

 1. 引用必须要初始化: int &b; // 错误
 2. 引用在初始化后, 不可以改变

### 2.3 引用做函数参数

1. 作用: 函数传参时, 可以利用引用的技术让形参修饰实参
2. 优点: 可以简化指针修改实参

```C++
#include <iostream>
using namespace std;
// 交换函数
// 1. 值传递
void swap(int a, int b)
{
    int temp = a;
    a = b;
    b = temp;
}
// 2. 地址传递
void swap_add(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}
// 3. 引用传递
void swap_ref(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}
int main()
{
    int a = 10;
    int b = 20;
    swap(a, b); // 值传递, 形参不会修饰实参
    cout << "a=" << a << endl;
    cout << "b=" << b << endl;
    swap_add(&a, &b); // 地址传递, 形参会修饰实参
    cout << "a=" << a << endl;
    cout << "b=" << b << endl;
    swap_ref(a, b); // 引用传递, 形参会修饰实参
    cout << "a=" << a << endl;
    cout << "b=" << b << endl;
    return 0;
}
```

### 2.4 引用做函数返回值

1. 作用: 减少函数返回值个数, 减少函数调用
2. 注意: 不要返回局部变量引用
3. 函数调用作为左值

```C++
#include <iostream>
using namespace std;
// 1. 不要返回局部变量的引用
int &test01()
{
    int a = 10;
    return a; // error
}
// 2. 函数的调用可以作为左值
int &test02()
{
    static int a = 10;
    return a;
}
int main()
{
    // int &ref = test01();
    // cout << ref << endl;  // error

    int &ref2 = test02();
    cout << "ref2 = " << ref2 << endl;
    cout << "ref2 = " << ref2 << endl;
    test02() = 1000;  // 如果函数的返回值是引用, 这个函数调用可以作为左
    cout << "ref2 = " << ref2 << endl;
    cout << "ref2 = " << ref2 << endl;
    return 0;
}
```

### 2.5 引用的本质

1. 本质引用的本质在C++内部实现是一个指针常量

```C++
#include <iostream>
using namespace std;
int main()
{
    int a = 10;
    int &ref = a;
    // 自动转换为 int * const ref = &a;
    ref = 20;
    cout << "a: " << a << endl;
    cout << "ref: " << ref << endl;
}
```

### 2.6 常量引用

1. 作用: 常量引用主要用来修饰形参, 防止误操作

```C++
#include <iostream>
using namespace std;
void showValue(int &a)
{
    cout << "a = " << a << endl;
    a = 1000;
}
void showValue2(const int &a)
{
    cout << "a = " << a << endl;
    // a = 1000;  // 加入const之后值变为可读, 不可以修改
}
int main()
{
    int a = 10;
    int &ref = a;         // 引用必须引一块合法的内存空间
    const int &ref2 = 10; // 加上const: int temp=10; const int & ref2=temp;
    // ref2 = 10;  // 加入const之后值变为可读, 不可以修改
    showValue2(a);
    cout << "a = " << a << endl;
    showValue(a);
    cout << "a = " << a << endl;
}
```

## 3. 函数提高

### 3.1 函数默认参数

#### 3.1.1 默认参数注意事项

1. 如果某个位置已经有了默认参数, 那么从这个位置往后, 从左到右必须要有默认值
2. 函数声明和函数实现只能有一个有默认参数

### 3.2 函数占位参数

```C++
void func(int a, int = 10) // 占位参数也可以有默认参数
{
    cout << "this is func" << endl;
}
```

### 3.3 函数重载

#### 3.3.1 函数重载概述

1. 作用: 函数名可以相同, 提高复用性
2. 重载条件: 函数名相同, 参数不同, 函数体相同
3. 注意事项: 函数的返回值不可以作为函数重载条件

```C++
#include <iostream>
using namespace std;
// 函数重载的满足条件
// 1. 同一个作用域下
// 2. 函数名称相同
// 3. 函数的参数类型不同, 或者个数不同, 或者顺序不同

void func()
{
    cout << "Hello World" << endl;
}
void func(int a, double b)
{
    cout << "int double World!!!" << endl;
}
void func(double a, int b)
{
    cout << "double int World!!!" << endl;
}

int main()
{
    func();
    func(10, 3.14);
    func(10., 3);
}
```

#### 3.3.2 函数重载的注意事项

1. 引用作为函数重载条件
2. 函数重载碰到默认参数

```C++
#include <iostream>
using namespace std;
// 函数重在的注意事项
// 1. 引用作为重载的条件
void func(int &a)
{
    cout << "func(int &a)" << endl;
}
void func(const int &a)
{
    cout << "func(const int &a" << endl;
}
// 2. 函数重载碰到默认参数
void func2(int a, int b = 10)
{
    cout << "func2(int a, int b =10)" << endl;
}
void func2(int a)
{
    cout << "func2(int a)" << endl;
}

int main()
{
    int a = 10;
    func(a);  // 调用func(int &a)
    func(10); // 调用func(const int &a)
    // func2(10);  // error, 函数重载碰到默认参数
}
```

## 4. 类和对象

### 4.1 封装

#### 4.1.1 封装的意义

1. 将属性和行为作为一个整体
2. 将属性和行为加以权限控制
    1. public : 公有权限, 成员在类内可以访问, 类外可以访问
    2. private : 私有权限, 类内可以访问, 类外不可以访问, 儿子不可以访问父亲的私有的内容
    3. protected : 保护权限, 类内可以访问, 类外不可以访问, 儿子也可以访问父亲保护的内容

```C++
#include <iostream>
using namespace std;
// 设计一个圆类, 求圆的周长
const double pi = 3.14;
// class代表设计一个类
class Circle
{
    // 访问权限
public: // 公共权限
    // 类中的属性和行为统一称为成员
    // 属性: 成员属性、成员变量
    double radius; // 半径
    // 行为: 成员函数、成员方法
    double getArea()
    {
        return pi * radius * radius;
    }
    double getPerimeter()
    {
        return 2 * pi * radius;
    }
};
int main()
{
    // 通过圆类, 创建具体的圆
    Circle c1;
    c1.radius = 10;
    cout << "圆的面积是:" << c1.getArea() << endl;
    cout << "圆的周长是:" << c1.getPerimeter() << endl;
    return 0;
}
```

```C++
#include <iostream>
using namespace std;
#include <string>
// class代表设计一个类
class Person
{
public: // 公共权限
    string name;

protected: // 保护权限
    string car;

private: // 私有权限
    int password;

public:
    void func()
    {
        name = "xingming";
        car = "xiaomi su7";
        password = 123456;
        cout << "name: " << name << endl;
        cout << "car: " << car << endl;
        cout << "password: " << password << endl;
    }
};
int main()
{
    Person p1;
    p1.name = "xiaoming";
    // p1.car = "xiaomi su7";  // 保护权限内容, 在类外访问不到
    // p1.password = 123456;  // 私有权限内容, 在类外访问不到
    p1.func();
    return 0;
}
```

#### 4.1.2 struct和class的区别

1. struct默认权限为公共
2. class默认权限为私有

```C++
#include <iostream>
using namespace std;
#include <string>
class c1
{
    int m_a; // 默认权限是私有
};
struct c2
{
    int m_a; // 默认权限是公共
};
int main()
{
    // struct和class的区别
    // 1. struct默认权限为公共
    // 2. class默认权限为私有
    c1 c1;
    c2 c2;
    // c1.m_a = 10;  // 错误
    c2.m_a = 10; // 正确
    return 0;
}
```

#### 4.1.3 成员属性设置为私有

1. 将所有成员属性设置私有, 可以自己控制读写权限
2. 对于写权限, 我们可以检测数据的有效性

```C++
#include <iostream>
using namespace std;
#include <string>
// 成员属性设置为私有
// 1. 可以自己控制读写权限
// 2. 对于写可以检测数据有效性
class Person
{
private:
    string m_Name;  // 可读可写
    int m_Age = 18; // 只读
    string m_ido;   // 只写
public:
    void setName(string name)
    {
        m_Name = name;
    }
    string getName()
    {
        return m_Name;
    }
    int getAge()
    {
        return m_Age;
    }
    void setido(string ido)
    {
        m_ido = ido;
    }
};
int main()
{
    Person p;
    p.setName("xiaoming");
    p.setido("xiaohong");
    cout << "name: " << p.getName() << endl;
    cout << "age: " << p.getAge() << endl;
}
```

### 4.2 对象的初始化和清理

#### 4.2.1 构造函数和析构函数

1. 构造函数: 对象创建时调用
    1. 构造函数, 没有返回值也不写void
    2. 函数名称与类名相同
    3. 构造函数可以有参数, 因此可以发生重载
    4. 程序在调用对象时候会自动调用构造, 无需手动调用, 而且只会调用一次
2. 析构函数: 对象销毁时调用
    1. 析构函数, 没有返回值也不写void
    2. 函数名称与类名相同, 前面加~
    3. 析构函数没有参数, 因此不能发生重载
    4. 程序在销毁对象时候会自动调用析构, 无需手动调用, 而且只会调用一次

```C++
#include <iostream>
using namespace std;
// 对象的初始化和清理
// 1. 构造函数 进行初始化操作
class Person
{
public:
    // 1. 构造函数
    // 构造函数, 没有返回值也不写void
    // 函数名称与类名相同
    // 构造函数可以有参数, 因此可以发生重载
    // 程序在调用对象时候会自动调用构造, 无需手动调用, 而且只会调用一次
    Person()
    {
        cout << "Person的构造函数" << endl;
    }
    // 2. 析构函数
    // 析构函数, 没有返回值也不写void
    // 函数名称与类名相同, 前面加~
    // 析构函数没有参数, 因此不能发生重载
    // 程序在销毁对象时候会自动调用析构, 无需手动调用, 而且只会调用一次
    ~Person()
    {
        cout << "Person的析构函数" << endl;
    }
};

int main()
{
    Person p;
    return 0;
}
```

#### 4.2.2 构造函数的分类及作用

1. 分类方式
    1. 无参构造函数
    2. 有参构造函数
2. 三种调用方式
    1. 括号法
    2. 显示法
    3. 隐式转换法

```C++
#include <iostream>
using namespace std;
// 1. 构造函数的分类及调用
// 分类: 无参构造(默认构造)和有参构造

class Person
{
public:
    Person() // 1. 构造函数
    {
        cout << "Person的无参构造函数" << endl;
    }
    Person(int a) // 2. 有参构造函数
    {
        age = a;
        cout << "Person的有参构造函数" << endl;
    }
    Person(const Person &p) // 3. 拷贝构造函数
    {
        age = p.age;
        cout << "Person的拷贝构造函数" << endl;
    }
    ~Person() // 4. 析构函数
    {
        cout << "Person的析构函数" << endl;
    }
    int age;
};
// 调用
void test01()
{
    // 1. 括号法
    Person p1;     // 默认构造函数调用
    Person p2(10); // 有参构造函数调用
    Person p3(p2); // 拷贝构造函数调用
    // 注意事项: 调用默认构造函数时, 不要加()

    // 2. 显示法
    Person p4 = Person();   // 无参构造
    Person p5 = Person(10); // 有参构造
    Person p6 = p5;         // 拷贝构造
    // 注意事项1
    Person(10); // 匿名对象, 特点: 当前行执行结束后系统会立即回收掉匿名对象
    // 注意事项2: 不要利用拷贝构造函数来初始化匿名对象
    Person(p7); // error, 编译器会认为Person(p7) == Person p7;

    // 3. 隐式转换法
    Person p8 = 10; // 相当于Person p8 = Person(10);
    Person p9 = p8; // 相当于Person p9 = Person(p8);
}

int main()
{
    test01();
    return 0;
}
```

#### 4.2.3 拷贝构造函数调用时机

1. 拷贝构造函数调用时机的三种情况
    1. 使用一个已经创建完毕的对象来初始化一个新对象
    2. 值传递的方式给函数参数传值
    3. 以值方式返回局部对象

```C++
#include <iostream>
using namespace std;
// 拷贝构造函数的调用时机

class Person
{
public:
    Person() // 1. 构造函数
    {
        cout << "Person的无参构造函数" << endl;
    }
    Person(int a) // 2. 有参构造函数
    {
        age = a;
        cout << "Person的有参构造函数" << endl;
    }
    Person(const Person &p) // 3. 拷贝构造函数
    {
        age = p.age;
        cout << "Person的拷贝构造函数" << endl;
    }
    ~Person() // 4. 析构函数
    {
        cout << "Person的析构函数" << endl;
    }
    int age;
};
// 1. 使用一个已经创建完毕的对象来初始化一个新对象
void test01()
{
    Person p1(20);
    Person p2(p1);
    cout << "p2 age: " << p2.age << endl;
}
// 2. 值传递的方式给函数参数传值
void doWork(Person p)
{
    p.age = 1000;
}
void test02()
{
    Person p;
    doWork(p);
}
// 3. 以值方式返回局部对象
Person dowWork2()
{
    Person p;
    cout << &p << endl;
    return Person(p);
}
void test03()
{
    Person p = dowWork2();
    cout << &p << endl;
}
int main()
{
    test01();
    test02();
    test03();

    return 0;
}
```

#### 4.2.4 构造函数调用规则

- 默认情况下, C++编译器至少给一个类添加3个函数
    1. 默认构造函数(无参, 函数体为空)
    2. 默认析构函数(无参, 函数体为空)
    3. 默认拷贝构造函数, 对属性进行值拷贝

- 拷贝规则
    1. 如果用户定义了有参构造函数, C++不会再提供无参构造函数, 但会提供拷贝构造函数
    2. 如果用户定义了拷贝构造函数, C++不会再提供默认拷贝构造函数

```C++
#include <iostream>
using namespace std;
// 构造函数的调用规则
// 1. 创建一个类, C++编译器会给每一个类都添加至少3个函数
// 默认构造函数(无参, 函数体为空)
// 默认析构函数(无参, 函数体为空)
// 默认拷贝构造函数, 对属性进行值拷贝

// 2. 如果用户定义了有参构造函数, C++不会再提供无参构造函数, 但会提供拷贝构造函数
// 3. 如果用户定义了拷贝构造函数, C++不会再提供默认拷贝构造函数
class Person
{
public:
    Person()
    {
        cout << "默认构造函数" << endl;
    }
    Person(int a)
    {
        cout << "有参构造函数" << endl;
        age = a;
    }
    // Person(const Person &p)
    // {
    //     age = p.age;
    //     cout << "拷贝构造函数" << endl;
    // }
    ~Person()
    {
        cout << "析构函数" << endl;
    }
    int age;
};
void test01()
{
    Person p1;
    p1.age = 10;
    Person p2(p1);
    cout << "p2.age = " << p2.age << endl;
}

void test02()
{
    Person p(18);
    Person p2(p);
    cout << "p.age = " << p.age << endl;
    cout << "p2.age = " << p2.age << endl;
}
int main()
{
    test02();
    return 0;
}
```

#### 4.2.5 深拷贝与浅拷贝

1. 浅拷贝: 简单的复制拷贝
2. 深拷贝: 在读取重新申请空间, 进行拷贝操作

```C++
#include <iostream>
using namespace std;
// 深拷贝与浅拷贝
class Person
{
public:
    Person()
    {
        cout << "Person默认构造函数" << endl;
    }
    Person(int age, int height)
    {
        m_Age = age;
        m_Height = new int(height);
        cout << "Person有参构造函数" << endl;
    }
    Person(const Person &p)
    {
        m_Age = p.m_Age;
        m_Height = p.m_Height;           // 浅拷贝, 编译器默认的操作
        m_Height = new int(*p.m_Height); // 在堆区开辟数据做拷贝操作
        cout << "Person拷贝构造函数" << endl;
    }
    ~Person()
    {
        // 析构代码, 将堆区开辟数据做释放操作
        if (m_Height != NULL)
        {
            delete m_Height;
            m_Height = NULL;
        }
        cout << "Person析构函数" << endl;
    }
    int m_Age;
    int *m_Height;
};
void test01()
{
    Person p1(18, 185);
    cout << "p1.m_Age = " << p1.m_Age << " p1.m_Height = " << *p1.m_Height << endl;
    Person p2(p1);
    cout << "p2.m_Age = " << p2.m_Age << " p2.m_Height = " << *p2.m_Height << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 4.2.6 初始化列表

- 语法: 构造函数(): : 属性1(值1), 属性2(值2), 属性3(值3) ... {}

```C++
#include <iostream>
using namespace std;
// 初始化列表
class Person
{
public:
    // Person(int a, int b, int c) // 传统初始化操作
    // {
    //     m_A = a;
    //     m_B = b;
    //     m_C = c;
    // }
    
    Person(int a, int b, int c) : m_A(a), m_B(b), m_C(c) // 列表初始化属性
    {
    }
    int m_A;
    int m_B;
    int m_C;
};
void test01()
{
    Person p(10, 20, 30);
    cout << p.m_A << endl;
    cout << p.m_B << endl;
    cout << p.m_C << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 4.2.7 类对象作为类成员

```C++
#include <iostream>
using namespace std;
#include <string>
// 初始化列表
class Phone
{
public:
    Phone(string pName)
    {
        m_PName = pName;
        cout << "Phone的构造函数调用" << endl;
    }
    ~Phone()
    {
        cout << "Phone的析构函数调用" << endl;
    }
    string m_PName;
};
class Person
{
public:
    string name;
    Phone m_phone;
    Person(string name, string phone) : name(name), m_phone(phone)
    {
        cout << "Person的构造函数调用" << endl;
    }
    ~Person()
    {
        cout << "Person的析构函数调用" << endl;
    }
};
// 1. 当其他类对象作为本类成员, 构造时先构造类对象, 再构造自身
// 2. 析构时先析构自身, 再析构类对象

void test01()
{
    Person p("张三", "iphone");
    cout << p.name << ":" << p.m_phone.m_PName << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 4.2.8 静态成员

1. 静态成员变量
    1. 所有对象共享一份数据
    2. 在编译阶段分配内存
    3. 类内声明, 类外初始化

2. 静态成员函数
    1. 所有对象共享一个函数
    2. 静态成员函数只能访问静态成员变量

```C++
#include <iostream>
using namespace std;

// 静态成员变量
class Person
{
public:
    // 1. 所有对象共享一份数据
    // 2. 在编译阶段分配内存
    // 3. 类内声明, 类外初始化
    static int m_A;

private:
    static int m_B;
};
int Person::m_A = 100;
int Person::m_B = 200;
void test01()
{
    Person p;
    cout << "p.m_A: " << p.m_A << endl;
    Person p2;
    p2.m_A = 200;
    cout << "p2.m_A: " << p2.m_A << endl;
}
void test02()
{
    // 静态成员变量不属于某一个对象上, 所有对象都共享同一份数据, 因此静态成员变量有两种访问方式
    // 1. 通过对象进行访问
    Person p3;
    cout << "p3.m_A: " << p3.m_A << endl;
    // 2. 通过类名进行访问
    cout << "Person::m_A: " << Person::m_A << endl;
    // 3. 静态成员变量不能通过对象访问
    // cout << "p3.m_B: " << p3.m_B << endl; // error 静态成员变量不能通过对象访问
}
int main()
{
    test01();
    test02();
    return 0;
}
```

```C++
#include <iostream>
using namespace std;

// 静态成员函数
// 1. 所有对象共享一个函数
// 2. 静态成员函数只能访问静态成员变量
class Person
{
public:
    static void func() // 静态成员函数
    {
        m_A = 100; // 静态成员函数可以访问静态成员变量
        // m_B = 200; // 静态成员函数不能访问非静态成员变量
        cout << "static void func调用" << endl;
    }
    static int m_A;
    int m_B;
    // 静态成员函数也是有访问权限的
private:
    static void func2()
    {
        cout << "static void func2调用" << endl;
    }
};
int Person::m_A = 10;
void test01()
{
    // 1. 通过对象访问
    Person p1;
    p1.func();
    cout << p1.m_A << endl;
    // 2. 通过类名访问
    Person::func();
    // Person::func2(); // 静态成员函数不能通过对象访问
}

int main()
{
    test01();
    return 0;
}
```

### 4.3 C++对象模型和this指针

#### 4.3.1 成员变量和成员函数分开存储

- 只有非静态成员变量才属于类的对象上

```C++
#include <iostream>
using namespace std;

// 成员变量和成员函数是分开存储的
class Person
{
public:
    int m_A;                // 非静态成员变量, 属于类的对象
    static int m_B;         // 静态成员变量, 不属于类的对象
    void func() {};         // 非静态成员函数, 属于类的对象
    static void func2() {}; // 静态成员函数, 不属于类的对象
};
int Person::m_B = 100;
void test01()
{
    Person p;
    // C++编译器会给每个空对象也分配一个字节空间, 是为了区分空对象占内存的位置
    // 每个空对象也应该有一个独一无二的内存地址
    cout << "sizeof(p) = " << sizeof(p) << endl; // 空对象占用内存为1, 非空对象占用内存为4
}
int main()
{
    test01();
    return 0;
}
```

#### 4.3.2 this指针概念

1. this指针指向被调用的函数所属的对象
    1. this指针是隐含每一个非静态成员函数内的一种指针
    2. this指针不需要定义, 直接使用即可
2. this指针的用途
    1. 当形参和成员变量同名时, 可用this指针来区分
    2. 在类的非静态成员函数中返回对象本身, 可以使用return *this;

```C++
#include <iostream>
using namespace std;

class Person
{
public:
    Person(int age)
    {
        // this指针指向的是被调用的成员函数(p1)所属的对象
        this->age = age;
    }
    // Person &PersonAddAge(Person &p)  // 返回值, 创建新的对象
    Person &PersonAddAge(Person &p) // 返回引用, 引用对象
    {
        this->age += p.age;
        // this指p2的指针, 而*this指向的是p2这个对象本体
        return *this;
    }
    int age;
};
// 1. 解决名称冲突
void test01()
{
    Person p(18);
    cout << "p1.age: " << p.age << endl;
}
// 2. 返回对象本身用*this
void test02()
{
    Person p1(18);
    Person p2(20);
    p2.PersonAddAge(p1).PersonAddAge(p1); // 链式编程思想
    cout << "p2.age: " << p2.age << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 4.3.3 空指针访问成员函数

- C++中空指针也可以调用成员函数, 但是也要注意有没有用到this指针

```C++
#include <iostream>
using namespace std;

// 空指针调用成员函数
class Person
{
public:
    void showClassName()
    {
        cout << "this is Person class" << endl;
    }
    void showPersonAge()
    {
        // 报错原因: 因为传入的指针是NULL
        if (this == NULL)
        {
            return;
        }
        cout << "age = " << m_Age << endl;
    }
    void showStatic()
    {
        // 空指针可以调用静态成员函数
        cout << "m_A = " << m_A << endl;
    }
    int m_Age;
    static int m_A;
};
int Person::m_A = 100;
void test01()
{
    Person *p = NULL;
    p->showClassName();
    p->showPersonAge();
    p->showStatic();
}
int main()
{
    test01();
    return 0;
}
```

#### 4.3.4 const修饰成员函数

1. 常函数
    1. 成员函数后加const后我们称这个函数为常函数
    2. 常函数内不可以修改成员属性
    3. 成员属性声明时加关键字mutable后, 在常函数中依然可以修改
2. 常对象
    1. 声明对象前加const成该对象为常对象
    2. 常对象只能调用常函数

```C++
#include <iostream>
using namespace std;

// 常函数
class Person
{
public:
    // this指针的本质是指针常量: 指针的指向是不可修改的
    // const Person *const this;
    // 在成员函数后加const, 修饰的是this指向, 让指针指向的值也不能修改
    Person() {}
    void showPerson() const
    {
        // this->m_Age = 100; // error
        // this = NULL;       // error
        this->m_Salary = 8000;
        cout << "m_Salary = " << m_Salary << endl;
    }
    void func() {}
    int m_Age;
    mutable int m_Salary;
};
void test01()
{
    Person p;
    p.showPerson();
}
// 常对象
void test02()
{
    const Person p;
    // p.m_Age = 100;
    // p.m_Salary = 8000;
    p.showPerson(); // 常对象可以调用常成员函数
    // p.func();       // 常对象不可以调用普通成员函数
}
int main()
{
    test01();
    test02();
    return 0;
}
```

### 4.4 友元

- 友元的目的就是让一个函数或者类访问另一个类的私有成员
- 友元关键词为: friend
- 有缘的三种实现
    1. 全局函数做友元
    2. 类做友元
    3. 成员函数做友元

```C++
#include <iostream>
using namespace std;
#include <string>

// 全局函数做友元
class Building
{
    // 告诉编译器goodGay函数是Building类的好朋友, 可以访问类中的私有内容
    friend void goodGay(Building *building);

public:
    Building()
    {
        m_SittingRoom = "客厅";
        m_BedRoom = "卧室";
    }
    string m_SittingRoom;

private:
    string m_BedRoom;
};
void goodGay(Building *building)
{
    cout << "好基友正在访问：" << building->m_SittingRoom << endl;
    cout << "好基友正在访问：" << building->m_BedRoom << endl;
}
void test01()
{
    Building b;
    goodGay(&b);
}
main()
{
    test01();
    return 0;
}
```

```C++
#include <iostream>
using namespace std;
#include <string>

class Building
{
public:
    friend class GoodGay;
    Building();
    string m_SittingRoom;

private:
    string m_BedRoom;
};

// 类做友元
class GoodGay
{
public:
    GoodGay();
    void visit();
    Building *building;
};
// 类外写成员函数
Building::Building()
{
    m_SittingRoom = "客厅";
    m_BedRoom = "卧室";
}
GoodGay::GoodGay()
{
    building = new Building;
}
void GoodGay::visit()
{
    cout << "好基友正在访问：" << building->m_SittingRoom << endl;
    cout << "好基友正在访问：" << building->m_BedRoom << endl;
}
void test01()
{
    GoodGay g;
    g.visit();
}
main()
{
    test01();
    return 0;
}
```

```C++
#include <iostream>
using namespace std;
#include <string>

class Building;
// 成员函数做友元
class GoodGay
{
public:
    GoodGay();
    void visit();  // 让visit函数可以访问Building中的私有成员
    void visit2(); // visit2函数不可以访问Building中的私有成员
    Building *building;
};
class Building
{
public:
    // 告诉编译器GoodGay类中的visit函数是Building类的好朋友, 可以访问私有成员
    friend void GoodGay::visit();
    Building();
    string m_SittingRoom; // 客厅
private:
    string m_BedRoom; // 卧室
};
Building::Building()
{
    m_SittingRoom = "客厅";
    m_BedRoom = "卧室";
}
GoodGay::GoodGay()
{
    building = new Building;
}
void GoodGay::visit()
{
    cout << "好基友正在访问：" << building->m_SittingRoom << endl;
    cout << "好基友正在访问：" << building->m_BedRoom << endl;
}
void GoodGay::visit2()
{
    cout << "好基友正在访问：" << building->m_SittingRoom << endl;
    // cout << "好基友正在访问：" << building->m_BedRoom << endl; // error
}
void test01()
{
    GoodGay g;
    g.visit();
    g.visit2();
}
main()
{
    test01();
    return 0;
}
```

### 4.5 运算符重载

- 作用: 实现两个自定义类型相加的运算

#### 4.5.1 加号运算符重载

```C++
#include <iostream>
using namespace std;

// 加号运算符重载
class Person
{
public:
    // 1. 成员函数重载+号
    // Person operator+(Person &p)
    // {
    //     Person temp;
    //     temp.m_A = this->m_A + p.m_A;
    //     temp.m_B = this->m_B + p.m_B;
    //     return temp;
    // }
    int m_A;
    int m_B;
};
// 2. 全局函数重载+号
Person operator+(Person &p1, Person &p2)
{
    Person temp;
    temp.m_A = p1.m_A + p2.m_A;
    temp.m_B = p1.m_B + p2.m_B;
    return temp;
}
// 运算符也可以发生重载
Person operator+(Person &p1, int a)
{
    Person temp;
    temp.m_A = p1.m_A + a;
    temp.m_B = p1.m_B + a;
    return temp;
}
void test01()
{
    Person p1;
    p1.m_A = 10;
    p1.m_B = 10;
    Person p2;
    p2.m_A = 10;
    p2.m_B = 10;
    // Person p3 = p1.operator+(p2);  // 成员函数的本质调用
    Person p4 = operator+(p1, p2); // 全局函数的本质调用
    Person p5 = p1 + p2;           // 简化形式
    Person p6 = p1 + 20;           // 运算符也可以发生重载
    cout << "m_A = " << p5.m_A << endl;
    cout << "m_B = " << p5.m_B << endl;
    cout << "m_A = " << p6.m_A << endl;
    cout << "m_B = " << p6.m_B << endl;
};
main()
{
    test01();
    return 0;
}
```

#### 4.5.2 左移运算符重载

- 作用: 可以输出自定义数据类型

```C++
#include <iostream>
using namespace std;
#include <string>

// 左移运算符重载
class Person
{
public:
    friend ostream &operator<<(ostream &cout, Person &p);
    Person(int a, int b)
    {
        this->m_A = a;
        this->m_B = b;
    }
    // 利用成员函数重载左移运算符, 通常不会利用成员函数重载左移运算符
    void operator<<(ostream &out)
    {
        out << "m_A = " << this->m_A << " m_B = " << this->m_B << endl;
    }

private:
    int m_A;
    int m_B;
};
// 全局函数重载左移运算符
ostream &operator<<(ostream &cout, Person &p)
{
    cout << "m_A = " << p.m_A << " m_B = " << p.m_B;
    return cout;
}
void test01()
{
    Person p(10, 20);
    p.operator<<(cout);                  // 成员函数重载左移运算符本质调用
    p << cout;                           // 成员函数重载左移运算符简化调用
    cout << p << " hello world" << endl; // 全局函数重载左移运算符调用
}
main()
{
    test01();
    return 0;
}
```

#### 4.5.3 递增运算符重载

- 作用: 通过重载递增运算符, 实现自己的整型数据

```C++
#include <iostream>
using namespace std;

// 重载递增运算符
// 自定义整型
class MyInteger
{
public:
    friend ostream &operator<<(ostream &cout, const MyInteger &myinst);
    MyInteger()
    {
        m_Num = 0;
    }
    // 重载前置++运算符
    MyInteger &operator++()
    {
        m_Num++;
        return *this;
    }
    // 重载后置++运算符
    MyInteger operator++(int) // int代表占位参数, 可以用于区分前置和后置++运算符
    {
        MyInteger temp = *this;
        m_Num++;
        return temp;
    }

private:
    int m_Num;
};
// // 重载左移运算符
ostream &operator<<(ostream &cout, const MyInteger &my_data)
{
    cout << my_data.m_Num;
    return cout;
}
void test01()
{
    MyInteger myinst;
    cout << ++myinst << endl;
    cout << myinst << endl;
}

void test02()
{
    MyInteger myinst;
    cout << myinst++ << endl;
    cout << myinst << endl;
}
main()
{
    // test01();
    test02();
    return 0;
}
```

#### 4.5.4 赋值运算符重载

- C++编译器至少给一个类添加4个函数
    1. 默认构造函数(无参, 函数体为空)
    2. 默认析构函数(无参, 函数体为空)
    3. 拷贝构造函数, 对属性进行值拷贝
    4. 赋值运算符operator=, 对属性进行值拷贝

```C++
#include <iostream>
using namespace std;

// 复制运算符重载
class Person
{
public:
    Person(int age)
    {
        m_Age = new int(age);
    }
    ~Person()
    {
        if (m_Age != NULL)
        {
            delete m_Age;
            m_Age = NULL;
        }
    }
    // 重载赋值运算符
    Person &operator=(const Person &p)
    {
        // 应该先判断是否友属性在堆区, 如果有先释放, 然后再深拷贝
        if (this->m_Age != NULL)
        {
            delete this->m_Age;
            this->m_Age = NULL;
        }
        this->m_Age = new int(*p.m_Age); // 深拷贝
        return *this;
    }
    // 拷贝构造函数
    Person(const Person &p)
    {
        this->m_Age = new int(*p.m_Age); // 深拷贝
    }
    int *m_Age;
};
void test01()
{
    Person p1(18);
    Person p2(20);
    Person p3(30);
    p2 = p1;         // 赋值运算符重载
    p2 = Person(p1); // 拷贝构造函数
    p3 = p2 = p1;    // 链式赋值操作
    cout << "p1.m_Age = " << *p1.m_Age << endl;
    cout << "p2.m_Age = " << *p2.m_Age << endl;
    cout << "p3.m_Age = " << *p3.m_Age << endl;
}
main()
{
    test01();
    return 0;
}
```

#### 4.5.5 关系运算符重载

- 作用: 重载关系运算符, 可以让两个自定义类型对象进行对比操作

```C++
#include <iostream>
using namespace std;

// 重载关系运算符
class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }

    bool operator==(Person &p)
    {
        return this->m_Name > p.m_Name && this->m_Age > p.m_Age;
    }
    bool operator!=(Person &p)
    {
        return this->m_Name != p.m_Name || this->m_Age != p.m_Age;
    }

    string m_Name;
    int m_Age;
};
void test01()
{
    Person p1("xiaoming", 19);
    Person p2("xiaoming", 18);
    if (p1 == p2)
    {
        cout << "p1 == p2" << endl;
    }
    else
    {
        cout << "p1 != p2" << endl;
    }
    if (p1 != p2)
    {
        cout << "p1 != p2" << endl;
    }
    else
    {
        cout << "p1 == p2" << endl;
    }
}
main()
{
    test01();
    return 0;
}
```

#### 4.5.6 函数调用运算符重载

1. 函数调用运算符()也可以重载
2. 由于重载后使用的方式非常像函数的调用, 因此成为仿函数
3. 仿函数没有固定写法, 非常灵活

```C++
#include <iostream>
using namespace std;

// 函数调用运算符重载
// 打印输出类
class MyPrint
{
public:
    // 重载函数调用运算符
    void operator()(string test)
    {
        cout << test << endl;
    }
};
// 仿函数非常的灵活, 没有固定的写法
class MyAdd
{
public:
    int operator()(int a, int b)
    {
        return a + b;
    }
};
void test01()
{
    MyPrint myPrint;
    myPrint("hello world"); // 由于使用起来类似函数调用, 因此称为仿函数
}
void test02()
{
    MyAdd myAdd;
    int ret = myAdd(10, 20);
    cout << "ret = " << ret << endl;
    // 匿名函数对象
    cout << MyAdd()(10, 20) << endl;
}
main()
{
    test01();
    test02();
    return 0;
}
```

### 4.6 继承

#### 4.6.1 继承的基本语法

- 继承的好处: 可以减少重复代码
- 语法: class 子类 : 继承方式 父类
- 子类也称为派生类, 父类也称为基类
- 派生类中的成员, 包含两大部分
    1. 一列是从基类继承过来的, 一类是自己添加的成员
    2. 从基类继承过来的表现其共性, 而新增的成员体现了其个性

```C++
#include <iostream>
using namespace std;

// 普通页面实现
// Python页面
class Python
{
public:
    void header()
    {
        cout << "页面、公开课、登录、注册..." << endl;
    }
    void footer()
    {
        cout << "帮助中心、交流合作、站内地图..." << endl;
    }
    void left()
    {
        cout << "Java、Python、C++..." << endl;
    }
    void content()
    {
        cout << "Python从入门到放弃..." << endl;
    }
};
// 继承实现页面
class BasePage
{
public:
    void header()
    {
        cout << "页面、公开课、登录、注册..." << endl;
    }
    void footer()
    {
        cout << "帮助中心、交流合作、站内地图..." << endl;
    }
    void left()
    {
        cout << "Java、Python、C++..." << endl;
    }
};
// Cpp页面
// 继承的好处: 减少重复代码
// 子类也称为派生类, 父类也称为基类
class Cpp : public BasePage // 语法: class 子类 : 继承方式 父类
{
public:
    void content()
    {
        cout << "C++从入门到放弃..." << endl;
    }
};

void test01()
{
    cout << "普通页面实现" << endl;
    Python p;
    p.header();
    p.footer();
    p.left();
    p.content();
    cout << "-------------------------------" << endl;
    cout << "继承实现页面" << endl;
    Cpp c;
    c.header();
    c.footer();
    c.left();
    c.content();
    cout << "-------------------------------" << endl;
}
main()
{
    test01();
    return 0;
}
```

#### 4.6.2 继承方式

- 继承方式一共有三种
    1. 公共继承
    2. 保护继承
    3. 私有继承

```C++
#include <iostream>
using namespace std;

// 继承方式
// 1. 公共继承
class Base1
{
public:
    int m_A;

protected:
    int m_B;

private:
    int m_C;
};
class Son1 : public Base1
{
    void func()
    {
        m_A = 100; // 父类中公共成员到子类中变为公共成员
        m_B = 200; // 父类中保护成员到子类中变为保护成员
        // m_C = 300; // 父类中的私有成员不能被继承
    }
};
// 2. 保护继承
class Son2 : protected Base1
{
    void func()
    {
        m_A = 100; // 父类中公共成员到子类中变为保护成员
        m_B = 200; // 父类中保护成员到子类中变为保护成员
        // m_C = 300; // 父类中的私有成员不能被继承
    }
};
class Son3 : private Base1
{
    void func()
    {
        m_A = 100; // 父类中公共成员到子类中变为私有成员
        m_B = 200; // 父类中保护成员到子类中变为私有成员
        // m_C = 300; // 父类中的私有成员不能被继承
    }
};
void test01()
{
    Son1 s1;
    s1.m_A = 100; // 到Son1中m_A是公共成员，可以被访问
    // s1.m_B = 200; // 到Son1中m_B是保护成员，不能被访问
    // s1.m_C = 300; // 到Son1中m_C是私有成员，不能被访问
    cout << "s1.m_A = " << s1.m_A << endl;
}
void test02()
{
    Son2 s2;
    // s2.m_A = 100; // 到Son2中m_A是保护成员，不能被访问
    // s2.m_B = 200; // 到Son2中m_B是保护成员，不能被访问
    // s2.m_C = 300; // 到Son2中m_C是私有成员，不能被访问
}
void test03()
{
    Son3 s3;
    // s3.m_A = 100; // 到Son3中m_A是私有成员，不能被访问
    // s3.m_B = 200; // 到Son3中m_B是私有成员，不能被访问
    // s3.m_C = 300; // 到Son3中m_C是私有成员，不能被访问
}
main()
{
    test01();
    test02();
    test03();
    return 0;
}
```

#### 4.6.3 继承中的对象模型

```C++
#include <iostream>
using namespace std;

// 继承中的对象模型
class Base
{
public:
    int m_A;

protected:
    int m_B;

private:
    int m_C;
};
class Son : public Base
{
public:
    int m_D;
};
// 利用开发人员命令提示工具查看对象模型: VS2017的开发人员命令提示符
// 跳转盘符 C:
// 跳转文件路径 cd C:\Users\13359\Documents\CppProject\Log\Study\01Advance
// 查看命令: cl /d1 reportSingleClassLayout类名 文件名
// cl /d1 reportSingleClassLayoutSon Temp.cpp

void test01()
{
    // 父类中所有非静态成员属性都会被子类继承下来
    // 父类中私有成员属性是被编译器给隐藏了, 因此是访问不到, 但是确实被继承下去了
    cout << "sizeof(Base) = " << sizeof(Base) << endl; // 12
    cout << "sizeof(Son) = " << sizeof(Son) << endl;   // 16
}
main()
{
    test01();
    return 0;
}
```

#### 4.6.4 继承中构造和析构顺序

- 先构造父类, 再构造子类, 析构顺序和构造相反

```C++
#include <iostream>
using namespace std;

// 继承中的构造和析构顺序
class Base
{
public:
    Base()
    {
        cout << "Base()" << endl;
    }
    ~Base()
    {
        cout << "~Base()" << endl;
    }
};
class Son : public Base
{
public:
    Son()
    {
        cout << "Son()" << endl;
    }
    ~Son()
    {
        cout << "~Son()" << endl;
    }
};
void test01()
{
    // 先构造父类, 再构造子类, 析构顺序和构造相反
    Son s;
}
main()
{
    test01();
    return 0;
}
```

#### 4.6.5 继承同名成员处理方式

1. 访问子类同名成员: 直接访问即可
2. 访问父类同名成员: 需要加作用域
3. 当子类与父类拥有同名的成员函数, 子类会隐藏父类中的同名成员函数, 加作用域可以访问到父类同名成员函数

```C++
#include <iostream>
using namespace std;

// 继承中的同名成员处理
class Base
{
public:
    Base()
    {
        m_A = 100;
    }
    void func()
    {
        cout << "Base func() = " << m_A << endl;
    }
    // 如果子类中出现和父类同名的成员函数, 子类的同名成员会隐藏掉父类中所有同名成员函数
    void func(int a)
    {
        cout << "Base func(int a) = " << a << endl;
    }
    int m_A;
};
class Son : public Base
{
public:
    Son()
    {
        m_A = 200;
    }
    void func()
    {
        cout << "Son func() = " << m_A << endl;
    }
    int m_A;
};
// 同名成员属性处理
void test01()
{
    Son s1;
    // 直接调用, 调用的是子类中的同名成员
    cout << "Son m_A = " << s1.m_A << endl;
    // 如果通过子类对象访问到父类中同名成员, 需要加作用域
    cout << "Base m_A = " << s1.Base::m_A << endl;
}
// 同名成员函数处理
void test02()
{
    Son s2;
    // 直接调用, 调用的是子类中的同名函数
    s2.func();
    // 如果通过子类对象访问到父类中同名函数, 需要加作用域
    s2.Base::func();
    // 如果想访问到父类中被隐藏的同名成员函数, 需要加作用域
    s2.Base::func(100);
}
main()
{
    test01();
    test02();
    return 0;
}
```

#### 4.6.6 继承同名静态成员处理方式

```C++
#include <iostream>
using namespace std;

// 继承中的同名静态成员处理
class Base
{
public:
    static int m_A;
    static void func() { cout << "Base::func()" << endl; }
    static void func(int a) { cout << "Base::func(int a)" << endl; }
};
int Base::m_A = 100;
class Son : public Base
{
public:
    static int m_A;
    static void func() { cout << "Son::func()" << endl; }
};
int Son::m_A = 200;
// 同名静态成员属性
void test01()
{
    // 1. 通过对象访问
    Son s;
    cout << "通过对象访问" << endl;
    cout << "s.m_A = " << s.m_A << endl;
    cout << "Base::m_A = " << s.Base::m_A << endl;
    // 2. 通过类名访问
    cout << "通过类名访问" << endl;
    cout << "Son 下 m_A = " << Son::m_A << endl;
    // 第一个::代表通过类名方式访问, 第二个::代表通过类名方式访问
    cout << "Base 下 m_A = " << Son::Base::m_A << endl;
}
// 同名静态函数
void test02()
{
    // 1. 通过对象访问
    Son s;
    cout << "通过对象访问" << endl;
    s.func();
    s.Base::func();
    // 2. 通过类名访问
    cout << "通过类名访问" << endl;
    Son::func();
    Son::Base::func();
    // 子类出现和父类同名静态成员函数, 也会隐藏父类中所有同名成员函数
    // 如果想访问父类中被隐藏同名成员, 需要加作用域
    Son::Base::func(100);
}
main()
{
    // test01();
    test02();
    return 0;
}
```

#### 4.6.7 多继承语法

- 语法 class 子类: 继承方式 父类1, 继承方式 父类2...
- 多继承可能会引发父类中有同名成员出现, 需要加作用域区分

```C++
#include <iostream>
using namespace std;

// 多继承语法
class Base1
{
public:
    Base1()
    {
        m_A = 100;
    }
    int m_A;
};
class Base2
{
public:
    Base2()
    {
        m_A = 200;
    }
    int m_A;
};
// 子类 需要继承Base1和Base2
// 语法: class 子类 : 继承方式 父类, 继承方式 父类2...
class Son : public Base1, public Base2
{
public:
    Son()
    {
        m_C = 500;
    }
    int m_C;
};
void test01()
{
    Son s;
    cout << "sizeof Son" << sizeof(s) << endl;
    // 当父类中出现同名成员, 需要加作用域区分
    cout << "m_A" << s.Base1::m_A << endl;
    cout << "m_B" << s.Base2::m_A << endl;
}
main()
{
    test01();
    return 0;
}
```

#### 4.6.8 菱形继承

- 菱形继承概论
    1. 两个派生类继承同一个基类
    2. 又有某个类同时继承两个派生类
    3. 这种继承被称为菱形继承, 或者钻石继承

```C++
#include <iostream>
using namespace std;

// 动物类
class Animal
{
public:
    int m_Age;
};
// 利用虚继承解决菱形继承问题
// 继承之前加上关键字virtual
// Animal类称为虚基类
// 羊类
class Sheep : virtual public Animal
{
};
// 驼类
class Horse : virtual public Animal
{
};
// 羊驼类
class SheepHorse : public Sheep, public Horse
{
};
void test01()
{
    SheepHorse s;
    s.Sheep::m_Age = 20;
    s.Horse::m_Age = 30;
    // 当菱形继承, 当两个父类拥有相同数据, 需要加以作用域区分
    cout << "s.Sheep::m_Age = " << s.Sheep::m_Age << endl;
    cout << "s.Horse::m_Age = " << s.Horse::m_Age << endl;
    cout << "s.m_Age = " << s.m_Age << endl;
    // m_Age我们只需要一份就可以了, 菱形继承导致数据有两份, 资源浪费
}
main()
{
    test01();
    return 0;
}
```

### 4.7 多态

#### 4.7.1 多态的基本概念

- 多态分为两类
    1. 静态多态
    2. 动态多态

- 静态多态和动态多态的区别
    1. 静态多态的函数地址早绑定 - 编译阶段确定函数地址
    2. 动态多态的函数地址晚绑定 - 运行阶段确定函数地址

```C++
#include <iostream>
using namespace std;

// 多态
class Animal
{
public:
    // void speak()
    virtual void speak()
    {
        cout << "Animal speak" << endl;
    }
};
class Cat : public Animal
{
public:
    void speak()
    {
        cout << "Cat speak" << endl;
    }
};
class Dog : public Animal
{
public:
    void speak()
    {
        cout << "Dog speak" << endl;
    }
};
// 地址早绑定, 再编译阶段就确定了函数地址
// 如果想执行让猫说话, 那么这个函数地址就不能提前绑定, 需要在运行阶段进行绑定
// 动态多态满足条件
// 1. 有继承关系
// 2. 子类要重写父类的虚函数
// 动态多态使用: 父类的指针或者引用 指向子类对象
void doSpeak(Animal &a)
{
    a.speak();
}
void test01()
{
    Cat c;
    doSpeak(c);
    Dog d;
    doSpeak(d);
}
main()
{
    test01();
    return 0;
}
```

#### 4.7.2 多态案例一: 计算器类

```C++
#include <iostream>
using namespace std;

// 计算器
class Calculator
{
public:
    int m_Num1;
    int m_Num2;
    int getRsult(string oper)
    {
        if (oper == "+")
        {
            return m_Num1 + m_Num2;
        }
        if (oper == "-")
        {
            return m_Num1 - m_Num2;
        }
        if (oper == "*")
        {
            return m_Num1 * m_Num2;
        }
        if (oper == "/")
        {
            return m_Num1 / m_Num2;
        }
        else
        {
            cout << "输入有误" << endl;
            return 0;
        }
    }
};
// 利用多态实现计算器
// 实现计算器抽象类
class AbstractCalculator
{
public:
    int m_Num1;
    int m_Num2;
    virtual int getResult() { return 0; };
};
class AddCalculator : public AbstractCalculator
{
public:
    int getResult()
    {
        return m_Num1 + m_Num2;
    }
};
class SubCalculator : public AbstractCalculator
{
public:
    int getResult()
    {
        return m_Num1 - m_Num2;
    }
};
class MulCalculator : public AbstractCalculator
{
public:
    int getResult()
    {
        return m_Num1 * m_Num2;
    }
};
void test01()
{
    Calculator c;
    c.m_Num1 = 10;
    c.m_Num2 = 10;
    cout << c.m_Num1 << " + " << c.m_Num2 << " = " << c.getRsult("+") << endl;
    cout << c.m_Num1 << " - " << c.m_Num2 << " = " << c.getRsult("-") << endl;
    cout << c.m_Num1 << " * " << c.m_Num2 << " = " << c.getRsult("*") << endl;
    cout << c.m_Num1 << " / " << c.m_Num2 << " = " << c.getRsult("/") << endl;
}
void test02()
{
    AbstractCalculator *abc = new AddCalculator;
    abc->m_Num1 = 100;
    abc->m_Num2 = 100;
    cout << abc->m_Num1 << " + " << abc->m_Num2 << " = " << abc->getResult() << endl;
    delete abc;
    abc = new SubCalculator;
    abc->m_Num1 = 100;
    abc->m_Num2 = 100;
    cout << abc->m_Num1 << " - " << abc->m_Num2 << " = " << abc->getResult() << endl;
    delete abc;
    abc = new MulCalculator;
    abc->m_Num1 = 100;
    abc->m_Num2 = 100;
    cout << abc->m_Num1 << " * " << abc->m_Num2 << " = " << abc->getResult() << endl;
}
int main()
{
    // test01();
    test02();
    return 0;
}
```

#### 4.7.3 纯虚函数和抽象类

- 纯虚函数: virtual 返回值 函数名(参数列表) = 0;
- 当类中有了纯虚函数, 这个类称为抽象类
- 抽象类特点
    1. 无法实例化对象
    2. 子类必须重写抽象类中的纯虚函数, 否则也属于抽象类

```C++
#include <iostream>
using namespace std;

// 纯虚函数和抽象类
class Base
{
public:
    // 抽象类特点
    // 1. 抽象类无法实例化对象
    // 2. 抽象类自类必须要重写父类中的纯虚函数, 否则也属于抽象类
    virtual void func() = 0; // 纯虚函数
};
class Son : public Base
{
public:
    void func() // 子类需要重写纯虚函数才能成功实例化对象
    {
        cout << "son func" << endl;
    }
};
void test01()
{
    Base *base = new Son;
    base->func();
}
int main()
{
    test01();
    return 0;
}
```

#### 4.7.4 多态案例二: 制作饮品

```C++
#include <iostream>
using namespace std;

// 多态案例2 制作饮品
class AbstractDrink
{
public:
    virtual void Boil() = 0;
    virtual void Brew() = 0;
    virtual void PourInCup() = 0;
    virtual void PutSomething() = 0;
    virtual void make()
    {
        Boil();
        Brew();
        PourInCup();
        PutSomething();
    }
};
class Coffee : public AbstractDrink
{
public:
    void Boil()
    {
        cout << "煮自来水" << endl;
    }
    void Brew()
    {
        cout << "冲泡咖啡" << endl;
    }
    void PourInCup()
    {
        cout << "倒入杯中" << endl;
    }
    void PutSomething()
    {
        cout << "加入牛奶" << endl;
    }
};
class Tea : public AbstractDrink
{
public:
    void Boil()
    {
        cout << "煮矿泉水" << endl;
    }
    void Brew()
    {
        cout << "冲泡茶叶" << endl;
    }
    void PourInCup()
    {
        cout << "倒入杯中" << endl;
    }
    void PutSomething()
    {
        cout << "加入枸杞" << endl;
    }
};
void doWork(AbstractDrink *drink)
{
    drink->make();
    delete drink;
}
void test01()
{
    doWork(new Coffee);
    cout << "--------" << endl;
    doWork(new Tea);
}
int main()
{
    test01();
    return 0;
}
```

#### 4.7.5 虚析构和纯虚析构

- 多态使用时, 如果子类中有属性开辟到堆区, 那么父类指针在释放时无法调用到子类的析构函数, 需要在父类中添加虚析构函数或者纯虚析构函数
- 虚析构和纯虚析构的共性
    1. 可以解决父类指针释放子类对象
    2. 都需要有具体的函数实现
- 虚析构和纯虚析构的区别
    1. 如果是纯虚析构, 该类属于抽象类, 无法实例化对象
- 总结
    1. 虚析构或纯虚析构都可以解决父类指针释放子类对象时不干净的问题
    2. 如果子类中没有堆区数据, 可以写虚析构或纯虚析构
    3. 拥有纯虚析构函数的类也属于抽象类

```C++
#include <iostream>
using namespace std;

// 虚析构和纯虚析构
class Animal
{
public:
    virtual void speak() = 0;
    Animal()
    {
        cout << "Animal()构造函数" << endl;
    }
    // 利用虚析构可以解决父类指针释放子类对象时不干净的问题
    // virtual ~Animal()
    // {
    //     cout << "Animal()析构函数" << endl;
    // }
    virtual ~Animal() = 0; // 纯虚析构
};
// 纯虚析构需要声明也要实现
// 有了纯虚析构之后, 这个类也属于抽象类, 无法实例化对象
Animal::~Animal()
{
    cout << "Animal()纯虚析构函数" << endl;
}
class Cat : public Animal
{
public:
    Cat(string name)
    {
        m_Name = new string(name);
        cout << "Cat()构造函数" << endl;
    }
    void speak()
    {
        cout << *m_Name << " cat speak" << endl;
    }
    ~Cat()
    {
        if (m_Name != NULL)
        {
            cout << "Cat()析构函数" << endl;
            delete m_Name;
            m_Name = NULL;
        }
    }
    string *m_Name;
};
void test01()
{
    Animal *animal = new Cat("Tom");
    animal->speak();
    delete animal;
}
int main()
{
    test01();
    return 0;
}
```

#### 4.7.6 多态案例三: 电脑组装

```C++
#include <iostream>
using namespace std;

// 多态案例三-电脑组装
// 抽象不同零件类
class CPU
{
public:
    virtual void calculate() = 0;
};
class VideoCard
{
public:
    virtual void display() = 0;
};
class Memory
{
public:
    virtual void storage() = 0;
};
class Computer
{
public:
    CPU *m_pCpu;
    VideoCard *m_pVc;
    Memory *m_pM;
    Computer(CPU *pCpu, VideoCard *pVc, Memory *pM)
    {
        m_pCpu = pCpu;
        m_pVc = pVc;
        m_pM = pM;
    }
    virtual ~Computer()
    {
        if (m_pCpu)
        {
            delete m_pCpu;
            m_pCpu = nullptr;
        }
        if (m_pVc)
        {
            delete m_pVc;
            m_pVc = nullptr;
        }
        if (m_pM)
        {
            delete m_pM;
            m_pM = nullptr;
        }
    }
    void work()
    {
        m_pCpu->calculate();
        m_pVc->display();
        m_pM->storage();
    }
};
// 具体厂商
// Intel厂商
class IntelCPU : public CPU
{
public:
    virtual void calculate()
    {
        cout << "Intel CPU 计算" << endl;
    }
};
class IntelVideoCard : public VideoCard
{
public:
    virtual void display()
    {
        cout << "Intel VideoCard 显示" << endl;
    }
};
class IntelMemory : public Memory
{
public:
    virtual void storage()
    {
        cout << "Intel Memory 存储" << endl;
    }
};
// 联想厂商
class LenovoCPU : public CPU
{
public:
    virtual void calculate()
    {
        cout << "Lenovo CPU 计算" << endl;
    }
};
class LenovoVideoCard : public VideoCard
{
public:
    virtual void display()
    {
        cout << "Lenovo VideoCard 显示" << endl;
    }
};
class LenovoMemory : public Memory
{
public:
    virtual void storage()
    {
        cout << "Lenovo Memory 存储" << endl;
    }
};
void test01()
{
    // 第一台电脑零件
    CPU *IntelCpu = new IntelCPU;
    VideoCard *IntelVc = new IntelVideoCard;
    Memory *IntelM = new IntelMemory;
    // 创建第一台电脑
    Computer *computer1 = new Computer(IntelCpu, IntelVc, IntelM);
    computer1->work();
    delete computer1;
    cout << "--------------------" << endl;
    // 第二台电脑组装
    cout << "第二台电脑开始工作" << endl;
    Computer *computer2 = new Computer(new LenovoCPU, new LenovoVideoCard, new LenovoMemory);
    computer2->work();
    delete computer2;
    cout << "--------------------" << endl;
    cout << "第三台电脑开始工作" << endl;
    Computer *computer3 = new Computer(new LenovoCPU, new IntelVideoCard, new LenovoMemory);
    computer3->work();
    delete computer3;
}
int main()
{
    test01();
    return 0;
}
```

## 5. 文件操作

- 文件类型分为两种
    1. 文本文件: 文件以文本的ASCII码形式存储
    2. 二进制文件: 文件以文本的二进制形式存储
- 操作文件的三大类
    1. ofstream: 向文件中写入数据
    2. ifstream: 从文件中读取数据
    3. fstream: 同时进行读写操作

### 5.1 文本文件

#### 5.1.1 写文件

- 写文件步骤如下
    1. 包含头文件
        - #include <"fstream">
    2. 创建流对象
        - ofstream ofs;
    3. 打开文件
        - ofs.open("文件路径", 模式);
    4. 写数据
        - ofs << "数据" << endl;
    5. 关闭文件
        - ofs.close();
- 文件打开方式
    1. ios::in
        - 打开文件用于读取, 如果文件不存在则无法打开
    2. ios::out
        - 打开文件用于写入, 如果文件不存在则创建
    3. ios::app
        - 打开文件用于追加, 如果文件不存在则创建
    4. ios::ate
        - 打开文件用于追加, 如果文件不存在则创建, 并将文件指针移动到文件末尾
    5. ios::trunc
        - 打开文件用于写入, 如果文件存在则删除, 创建新文件
    6. ios::binary
        - 打开文件用于二进制操作, 默认为文本操作

```C++
#include <iostream>
using namespace std;
#include <fstream>
// 文本文件 写文件
void test01()
{
    ofstream ofs;
    ofs.open("test.txt", ios::out);
    ofs << "hello world" << endl;
    ofs.close();
}
// 文本文件 读文件
void test02()
{
    ifstream ifs;
    ifs.open("test.txt", ios::in);
    if (!ifs.is_open())
    {
        cout << "文件打开失败" << endl;
        return;
    }
    // 读数据
    // 第一种
    // char buf1[1024] = {0};
    // while (ifs >> buf1)
    // {
    //     cout << buf1 << endl;
    // }
    // // 第二种
    // char buf[1024] = {0};
    // while (ifs.getline(buf, sizeof(buf)))
    // {
    //     cout << buf << endl;
    // }
    // 第三种
    string buf;
    while (getline(ifs, buf))
    {
        cout << buf << endl;
    }
    // // 第四种
    // char c;
    // // while (ifs.get(c))
    // while ((c = ifs.get()) != EOF)
    // {
    //     cout << c;
    // }
    // 关闭文件
    ifs.close();
}
int main()
{
    // test01(); // 写文件
    test02(); // 读文件
    return 0;
}
```

### 5.2 二进制文件

```C++
#include <iostream>
using namespace std;
#include <fstream>
// 二进制文件 写文件
class Person
{
public:
    char m_Name[64];
    int m_Age;
};
void test01()
{
    // 1.创建Person对象
    Person p = {"张三", 18};
    // 2.创建流对象
    ofstream ofs;
    // 3.打开文件
    ofs.open("person.txt", ios::out | ios::binary);
    // 4.写文件
    ofs.write((const char *)&p, sizeof(Person));
    // 5.关闭文件
    ofs.close();
}
void test02()
{
    // 1. 包含头文件
    // 2. 创建流对象
    ifstream ifs;
    // 3. 打开文件
    ifs.open("person.txt", ios::in | ios::binary);
    if (!ifs.is_open())
    {
        cout << "文件打开失败" << endl;
        return;
    }
    // 4. 读文件
    Person p;
    ifs.read((char *)&p, sizeof(Person));
    cout << "姓名：" << p.m_Name << " 年龄：" << p.m_Age << endl;
    // 5. 关闭文件
    ifs.close();
}
int main()
{
    // test01(); // 写文件
    test02(); // 读文件
    return 0;
}
```
