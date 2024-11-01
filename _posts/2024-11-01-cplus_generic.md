---
layout: post
title: "C++泛型编程和STL"
date:   2024-11-01
tags: [C++]
comments: true
author: starcheng
---

###### 说明：本教程适用于C++初学者的小白, 内容主要是个人总结的一些个人学习笔记, 仅供参考

<!-- more -->

### C++泛型编程和STL

## 1. 模板

### 1.1 模板的概念

+ 模板就是建立通用的模具, 大大提升复用率
+ 模板不可以直接使用, 他只是一个框架
+ 模板的用用并不是万能的

### 1.2 函数模板

#### 1.2.1 函数模板语法

+ 建立一个通用函数, 其函数返回值和型参类大学可以不具体定义, 用一个虚拟的类型来代替
+ 语法: `template<typename T>`

```shell
#include <iostream>
using namespace std;

// 函数模板
// 交换两个整形
void swapInt(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}
// 交换两个浮点型
void swapDouble(float &a, float &b)
{
    float temp = a;
    a = b;
    b = temp;
}
// 函数模板
// template<class T>
template <typename T>
void swapTemplate(T &a, T &b)
{
    T temp = a;
    a = b;
    b = temp;
}
void test01()
{
    int a = 10;
    int b = 20;
    swapInt(a, b);
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;

    float c = 10.1;
    float d = 20.2;
    swapDouble(c, d);
    cout << "c = " << c << endl;
    cout << "d = " << d << endl;

    // 利用函数模板
    // 1. 自动类型推导
    swapTemplate(a, b);
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    // 2. 指定类型
    swapTemplate<int>(a, b);
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 1.2.2 函数模板注意事项

+ 自动类型推导, 必须推导出一致的数据类型T, 才可以使用
+ 模板必须要确定出T的数据类型, 才可以使用

```shell
#include <iostream>
using namespace std;

// 函数模板注意事项
template <class T>
void swapClass(T &a, T &b)
{
    T temp = a;
    a = b;
    b = temp;
}
// 1. 自动类型推导, 必须推导出一致的数据类型T, 才可以使用
void test01()
{
    int a = 10;
    int b = 20;
    float c = 3.14;
    swapClass(a, b);
    // swapClass(c, b); // error, 推导不出一致数据类型
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
}
// 2. 模板必须要确定出T的数据类型, 才可以使用
template <class T>
void func()
{
    cout << "func" << endl;
}
void test02()
{
    func<int>(); // 如果不确定类型, 无法调用func
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 1.2.3 函数模板案例

+ 利用函数模板封装一个排序的函数, 可以对不同数据类型数组进行排序
+ 排序规则从大到小, 排序算法为选择排序
+ 分别利用char数组和int数组进行测试

```shell
#include <iostream>
using namespace std;

// 对数组进行排序的函数
// 交换函数
template <class T>
void mySwap(T &a, T &b)
{
    T temp = a;
    a = b;
    b = temp;
}
// 选择排序算法
template <class T>
void mySort(T arr[], int len)
{
    for (int i = 0; i < len; i++)
    {
        int max = i;
        for (int j = i + 1; j < len; j++)
        {
            if (arr[max] < arr[j])
            {
                max = j;
            }
        }
        if (max != i)
        {
            mySwap(arr[max], arr[i]);
        }
    }
}
template <class T>
void printArray(T arr[], int len)
{
    for (int i = 0; i < len; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}
void test01()
{
    char charArr[] = "hello\0";
    int len_charArr = sizeof(charArr) / sizeof(char);
    mySort(charArr, len_charArr);
    printArray(charArr, len_charArr);
    int intArr[] = {1, 3, 2, 7, 5, 6, 7, 4, 1};
    int len_intArr = sizeof(intArr) / sizeof(int);
    mySort(intArr, len_intArr);
    printArray(intArr, len_intArr);
    float floatArr[] = {1.1, 3.3, 2.2, 7.7, 5.5, 6.6, 7.7, 4.4, 1.1};
    int len_floatArr = sizeof(floatArr) / sizeof(float);
    mySort(floatArr, len_floatArr);
    printArray(floatArr, len_floatArr);
}
int main()
{
    test01();
    return 0;
}
```

#### 1.2.4 普通函数和函数模板的区别

+ 普通函数调用时可以发生自动类型转换(隐式类型转换)
+ 函数模板调用时, 如果利用自动类型推导, 不会发生自动类型转换
+ 如果利用显示类型转换, 可以发生自动类型转换

```shell
#include <iostream>
using namespace std;

// 普通函数与模板函数的区别
// 1. 普通函数调用时可以发生自动类型转换(隐式类型转换)
// 2. 函数模板调用时, 如果利用自动类型推导, 不会发生自动类型转换
// 3. 如果利用显示类型转换, 可以发生自动类型转换
// 普通函数
int myAdd(int a, int b)
{
    return a + b;
}
// 函数模板
template <class T>
T myAdd2(T a, T b)
{
    return a + b;
}
void test01()
{
    int a = 10;
    int b = 20;
    char c = 'c';
    cout << myAdd(a, b) << endl;
    cout << myAdd(a, c) << endl; // 隐式类型转换, 将char类型转换为int类型

    // 1. 自动类型推导
    // 自动类型推导, 不会发生隐式类型转换
    // cout << myAdd2(a, c) << endl; // error, a和c的类型不同, 不可以发生类型转换

    // 2. 显示类型转换
    // 显示制定类型, 会发生隐式类型转换
    cout << myAdd2<int>(a, c) << endl;
    cout << myAdd2<char>(a, c) << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 1.2.5 普通函数和函数模板的调用规则

+ 调用规则
    1. 如果函数模板和普通函数都可以实现, 有限调用普通函数
    2. 可以通过空模板参数列表来强制调用函数模板
    3. 函数模板也可以发生重载
    4. 如果函数模板可以产生更好的匹配, 优先调用函数模板

```shell
#include <iostream>
using namespace std;

// 普通函数和函数模板的调用规则
void myprint(int a, int b)
{
    cout << "普通函数" << endl;
}
template <class T>
void myprint(T a, T b)
{
    cout << "函数模板" << endl;
}

template <class T>
void myprint(T a, T b, T c)
{
    cout << "函数重载模板" << endl;
}

void test01()
{
    // 1. 如果函数模板和普通函数都可以实现, 有限调用普通函数
    myprint(10, 20);
    // 2. 可以通过空模板参数列表来强制调用函数模板
    myprint<>(10, 20);
    // 3. 函数模板也可以发生重载
    myprint(1, 2, 3);
    // 4. 如果函数模板可以产生更好的匹配, 优先调用函数模板
    myprint('a', 'b');
}
int main()
{
    test01();
    return 0;
}
```

#### 1.2.6 模板的局限性

+ 局限性: 模板的通用性并不是万能的

```shell
#include <iostream>
using namespace std;
#include <string>

// 模板的局限性
// 模板并不是万能的, 有些特定数据类型, 需要用具体化方式来实现
// 对比两个函数是否相等
class Person
{
public:
    string m_name;
    int m_age;
    Person(string name, int age)
    {
        this->m_name = name;
        this->m_age = age;
    }
};
template <class T>
bool myCompare(T &a, T &b)
{
    if (a == b)
        return true;
    else
        return false;
}
// 利用具体化的Person版本实现代码, 具体化会优先调用
template <>
bool myCompare(Person &p1, Person &p2)
{
    if (p1.m_name == p2.m_name && p1.m_age == p2.m_age)
        return true;
    else
        return false;
}
void test01()
{
    int a = 10;
    int b = 20;
    bool ret = myCompare(a, b);
    if (ret)
        cout << "a == b" << endl;
    else
        cout << "a != b" << endl;
}
void test02()
{
    Person p1("Tom", 18);
    Person p2("Amy", 20);
    bool ret = myCompare(p1, p2);
    if (ret)
        cout << "p1 == p2" << endl;
    else
        cout << "p1 != p2" << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

### 1.3 类模板

#### 1.3.1 类模板语法

+ 类模板作用: 建立一个通用类, 类中的成员数据类型可以不具体制定, 用一个虚拟的类型来代表

```shell
#include <iostream>
using namespace std;
#include <string>

// 类模板
template <class NameType, class AgeType>
class Person
{
public:
    Person(NameType name, AgeType age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    void showPerson()
    {
        cout << "name: " << this->m_Name << ", age: " << this->m_Age << endl;
    }
    NameType m_Name;
    AgeType m_Age;
};
void test01()
{
    Person<string, int> p("monkey sun", 100);
    p.showPerson();
}
int main()
{
    test01();
    return 0;
}
```

#### 1.3.2 类模板和函数模板的区别

+ 类模板和函数模板的区别主要有两点
    1. 类模板没有自动类型推导功能
    2. 类模板在模板参数列表中可以有默认参数

```shell
#include <iostream>
using namespace std;
#include <string>

// 类模板和类模板的区别
template <class NameType, class AgeType = int>
class Person
{
public:
    Person(NameType name, AgeType age)
    {
        this->m_Name = name;
        this->m_Age = age;
    };
    void showPerson()
    {
        cout << "name: " << this->m_Name << " age: " << this->m_Age << endl;
    };
    NameType m_Name;
    AgeType m_Age;
};
// 1. 类模板没有自动类型推导功能
void test01()
{
    // Person p1("Tom", 10); // 推导失败, 无法自动类型推导
    Person<string, int> p1("Tom", 18); // 只能使用显示指定类型
    p1.showPerson();
}
// 2. 类模板在模板参数列表中可以添加默认参数
void test02()
{
    Person<string> p2("Amy", 18); // 因为默认age为整形, 所以这里可以省略
    p2.showPerson();
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 1.3.3 类模板中成员函数调用时机

+ 类模板中成员函数和普通类模板中成员函数调用时机的区别
    1. 普通类中的成员函数一开始就可以创建
    2. 类模板中的成员函数在调用时才创建

```shell
#include <iostream>
using namespace std;
#include <string>

// 类模板中成员函数的创建时机
class Person1
{
public:
    void showPerson1()
    {
        cout << "Person1 show" << endl;
    }
};
class Person2
{
public:
    void showPerson2()
    {
        cout << "Person2 show" << endl;
    }
};
template <class T>
class Person
{
public:
    T obj;
    // 类模板中成员函数
    void func1()
    {
        obj.showPerson1();
    }
    void func2()
    {
        obj.showPerson2();
    }
};
void test01()
{
    Person<Person1> p1;
    p1.func1();
    Person<Person2> p2;
    p2.func2();
}
int main()
{
    test01();
    return 0;
}
```

#### 1.3.4 类模板对象做函数参数

+ 类模板实例化出的对象, 向函数传递参数的方式
    1. 指定传入的类型: 直接显示对象的数据类型
    2. 参数模板化: 将对象中的参数变为模板进行传递
    3. 整个类型模板化: 将整个对象类型模板化进行传递

```shell
#include <iostream>
using namespace std;
#include <string>

// 类模板的对象做函数的参数
template <class T1, class T2>
class Person
{
public:
    Person(T1 name, T2 age)
    {
        this->m_name = name;
        this->m_age = age;
    }
    void showPerson()
    {
        cout << "name: " << this->m_name << " age: " << this->m_age << endl;
    }
    T1 m_name;
    T2 m_age;
};
// 1. 指定传入的类型
void printPerson1(Person<string, int> &p)
{
    p.showPerson();
}
void test01()
{
    Person<string, int> p("Tom", 20);
    printPerson1(p);
}
// 2. 参数模板化:
template <class T1, class T2>
void printPerson2(Person<T1, T2> &p)
{
    p.showPerson();
    cout << "T1的类型: " << typeid(T1).name() << endl;
    cout << "T2的类型: " << typeid(T2).name() << endl;
}

void test02()
{
    Person<string, int> p("Amy", 18);
    printPerson2(p);
}
// 3. 整个类型模板化
template <class T>
void printPerson3(T &p)
{
    p.showPerson();
    cout << "T的类型: " << typeid(T).name() << endl;
}
void test03()
{
    Person<string, int> P("Jack", 20);
    printPerson3(P);
}
int main()
{
    test01();
    test02();
    test03();
    return 0;
}
```

#### 1.3.5 类模板与继承

+ 当子类继承的父类是一个类模板时, 子类在声明的时候, 要指定出父类中T的类型
+ 如果不指定, 编译器无法给子类分配内存
+ 如果想灵活指定出父类中T的类型, 子类也需要变为类模板

```shell
#include <iostream>
using namespace std;
#include <string>

// 类模板与继承
template <class T>
class Base
{
public:
    T m;
};
// 当子类继承的父类是一个类模板时, 子类在声明的时候, 要指定出父类中T的类型
// class Son : public Base // erorr, 必须要知道父类中的T类型, 才能继承给子类
class Son : public Base<int>
{
};
template <class T1, class T2>
class Son2 : public Base<T2>
{
public:
    Son2()
    {
        cout << "T1的类型为: " << typeid(T1).name() << endl;
        cout << "T2的类型为: " << typeid(T2).name() << endl;
    }
    T1 obj;
};
void test01()
{
    Son s;
    s.m = 10;
    cout << s.m << endl;
}
void test02()
{
    Son2<string, int> s2;
    s2.obj = "hello";
    cout << s2.obj << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 1.3.6 类模板成员函数类外实现

```shell
#include <iostream>
using namespace std;
#include <string>

// 类模板成员函数类外实现
template <class T1, class T2>
class Person
{
public:
    Person(T1 name, T2 age);
    void showPerson();
    T1 m_Name;
    T2 m_Age;
};
// 构造函数的类外实现
template <class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age)
{
    this->m_Name = name;
    this->m_Age = age;
}
// 成员函数类外实现
template <class T1, class T2>
void Person<T1, T2>::showPerson()
{
    cout << "name: " << this->m_Name << ", age: " << this->m_Age << endl;
}
void test01()
{
    Person<string, int> p("Tom", 20);
    p.showPerson();
}
int main()
{
    test01();
    return 0;
}
```

#### 类模板分文件编写

+ 类模板中成员函数创建时期在调用阶段, 导致分文件编写时链接不到
    1. 解决方式1: 直接包含.cpp源文件
    2. 解决方式2. 将声明和实现写到同一个文件中, 并更改后缀名为.hpp, hpp是约定的名称, 并不算强制

Person.hpp

```shell
#pragma once
#include <iostream>
using namespace std;
#include <string>

// 类模板分文件编写以及解决
template <class T1, class T2>
class Person
{
public:
    Person(T1 name, T2 age);
    void showPerson();
    T1 m_Name;
    T2 m_Age;
};
template <class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age)
{
    this->m_Name = name;
    this->m_Age = age;
}
template <class T1, class T2>
void Person<T1, T2>::showPerson()
{
    cout << "name: " << this->m_Name << ", age: " << this->m_Age << endl;
}
```

Person.cpp

```shell
#include "Person.hpp"
void test01()
{
    Person<string, int> p("Tom", 20);
    p.showPerson();
}
int main()
{
    test01();
    return 0;
}
```

#### 1.3.8 类模板与友元

+ 全局函数类内实现: 直接在类内声明友元即可
+ 全局函数类外实现: 需要提前让编译器知道全局函数的存在

```shell
#include <iostream>
using namespace std;
#include <string>

// 提前让编译器知道Person类存在
template <class T1, class T2>
class Person;
// 类外实现
template <class T1, class T2>
void showPerson(Person<T1, T2> p)
{
    cout << "name: " << p.m_Name << ", age: " << p.m_Age << endl;
};

template <class T1, class T2>
class Person
{
public:
    // 全局函数类内实现
    // friend void showPerson(Person<T1, T2> p)
    // {
    //     cout << "name: " << p.m_Name << ", age: " << p.m_Age << endl;
    // };
    // 全局函数类外实现
    // 加空模版参数列表
    // 如果全局函数是类外, 需要让编译器提前知道这个函数的存在
    friend void showPerson<>(Person<T1, T2> p);
    Person(T1 name, T2 age)
    {
        this->m_Name = name;
        this->m_Age = age;
    };

private:
    T1 m_Name;
    T2 m_Age;
};
void test01()
{
    Person<string, int> p("Tom", 18);
    showPerson(p);
}
int main()
{
    test01();
    return 0;
}
```

#### 1.3.9 类模版案例

MyArray.hpp

```shell
#pragma
#include <iostream>
using namespace std;
#include <string>

template <class T>
class MyArray
{
public:
    MyArray(int capacity)
    {
        cout << "MyArray有参构造调用" << endl;
        this->m_capacity = capacity;
        this->m_size = 0;
        this->pAddress = new T[this->m_capacity];
    }
    // 拷贝构造
    MyArray(const MyArray &arr)
    {
        cout << "MyArray拷贝构造调用" << endl;
        this->m_capacity = arr.m_capacity;
        this->m_size = arr.m_size;
        this->pAddress = new T[arr.m_capacity];
        // 拷贝数组元素
        for (int i = 0; i < this->m_size; i++)
        {
            this->pAddress[i] = arr.pAddress[i];
        }
    }
    // operator=防止浅拷贝
    MyArray &operator=(const MyArray &arr)
    {
        cout << "MyArray operator=调用" << endl;
        if (this->pAddress != NULL)
        {
            delete[] this->pAddress;
            this->pAddress = NULL;
            this->m_size = 0;
            this->m_capacity = 0;
        }
        // 深拷贝
        this->m_capacity = arr.m_capacity;
        this->m_size = arr.m_size;
        this->pAddress = new T[arr.m_capacity];
        // 拷贝数组元素
        for (int i = 0; i < this->m_size; i++)
        {
            this->pAddress[i] = arr.pAddress[i];
        }
        return *this;
    }
    // 尾差法
    void Push_Back(const T &val)
    {
        if (this->m_size == this->m_capacity)
        {
            return;
        }
        this->pAddress[this->m_size] = val;
        this->m_size++;
    }
    // 尾删法
    void Pop_Back()
    {
        // 让用户访问不到最后一个元素, 逻辑上删除
        if (this->m_size == 0)
        {
            return;
        }
        this->m_size--;
    }
    // 通过下标访问元素
    T &operator[](int index)
    {
        return this->pAddress[index];
    }
    // 返回数组容量
    int Capacity()
    {
        return this->m_capacity;
    }
    // 返回数组大小
    int Size()
    {
        return this->m_size;
    }
    // 析构函数
    ~MyArray()
    {
        cout << "MyArray析构调用" << endl;
        if (this->pAddress != NULL)
        {
            delete[] this->pAddress;
            this->pAddress = NULL;
        }
    }

private:
    T *pAddress;    // 指针指向堆区开辟的真是数组
    int m_capacity; // 数组容量
    int m_size;     // 数组大小
};
```

MyArray.cpp

```shell
#include "myArray.hpp"

void PrintArray(MyArray<int> &arr)
{
    for (int i = 0; i < arr.Size(); i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}
void test01()
{
    MyArray<int> arr1(5);
    MyArray<int> arr2(arr1);
    MyArray<int> arr3(100);
    arr3 = arr1;
}
void test02()
{
    MyArray<int> arr1(5);
    for (int i = 0; i < 5; i++)
    {
        arr1.Push_Back(i + 1);
    }
    arr1.Pop_Back();
    PrintArray(arr1);
    cout << "arr1.Capacity() = " << arr1.Capacity() << endl;
    cout << "arr1.Size() = " << arr1.Size() << endl;
}
// 测试自定义数据类型
class Person
{
public:
    Person(){};
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    string m_Name;
    int m_Age;
};
void printPersonArray(MyArray<Person> &arr)
{
    for (int i = 0; i < arr.Size(); i++)
    {
        cout << "姓名：" << arr[i].m_Name << " 年龄：" << arr[i].m_Age << endl;
    }
    cout << endl;
}
void test03()
{
    MyArray<Person> arr1(10);
    Person p1("Tom", 18);
    Person p2("Amy", 19);
    Person p3("Jack", 20);
    Person p4("Taylor", 21);
    Person p5("Jarry", 22);
    // 用尾差法插入到数组中
    arr1.Push_Back(p1);
    arr1.Push_Back(p2);
    arr1.Push_Back(p3);
    arr1.Push_Back(p4);
    arr1.Push_Back(p5);
    // 打印数组
    printPersonArray(arr1);
    // 输出容量
    cout << "arr1.Capacity() = " << arr1.Capacity() << endl;
    // 输出大小
    cout << "arr1.Size() = " << arr1.Size() << endl;
}
int main()
{
    // test01();
    // test02();
    test03();
    return 0;
}
```

## 2 STL初识

### 2.1 STL的诞生

+ 为了可重复利用, STL诞生
+ 为了建立数据结构和算法的一套标准, STL诞生

### 2.2 STL基本概念

1. STL(Standard Template Library, 标准模版库)
2. STL从广义上分为: 容器(container), 算法(alworithm), 迭代器(iterator)
3. 容器和算法之间通过迭代器进行无缝连接
4. STL几乎所有代码都采用了模版类或者模版函数

### 2.3 STL六大组件

+ 容器(container), 算法(alworithm), 迭代器(iterator), 仿函数(function object), 适配器(adapter), 序列容器(sequence container)
    1. 容器: 各种数据结构, 如: vector, list, deque, set, map
    2. 算法: 各种常用算法, 如: sort, find, for_each, count, accumulate
    3. 迭代器: 扮演类容器与算法之间的胶水作用
    4. 仿函数: 行为类似函数, 可作为算法的某种策略
    5. 适配器: 一种用来修饰容器或者仿函数或迭代器接口的东西
    6. 序列容器: 负责空间的配置与管理

### 2.4 STL中容器, 算法, 迭代器

1. 容器
    1. 序列式容器: 强调值的排序, 序列式容器中的每个元素均有固定的位置
    2. 关联式容器: 二叉树结构, 各元素之间没有严格的物理上的顺序关系

2. 算法
    1. 质变算法: 运算过程中会改变区间内的元素内容
    2. 非质变算法: 指运算过程中不会改变区间内的元素内容

3. 迭代器: 迭代器使用非常类似于指针
    1. 输入迭代器: 只能进行输入, 不能进行输出
    2. 输出迭代器: 只能进行输出, 不能进行输入
    3. 前向迭代器: 既可以进行输入, 也可以进行输出, 但是只能单向移动
    4. 双向迭代器: 既可以进行输入, 也可以进行输出, 同时可以双向移动
    5. 随机访问迭代器: 既可以进行输入, 也可以进行输出, 同时可以双向移动, 而且可以任意访问任意位置的元素

### 2.5 容器算法迭代器初识

#### 2.5.1 Vector存放内置数据类型

+ 容器: vector
+ 算法: for_each
+ 迭代器: vector《int》::iterator

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void myPring(int value)
{
    cout << value << endl;
}
// vector容器存放内置数据类型
void test01()
{
    vector<int> v; // 创建一个vector容器, 当成数组使用
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    // 通过迭代器访问容器中的数据
    vector<int>::iterator itBegin = v.begin(); // 起始迭代器, 指向容器中第一个元素的前面
    vector<int>::iterator itEnd = v.end();     // 结束迭代器, 指向容器中最后一个元素的下一个位置
    // 第一种遍历
    while (itBegin != itEnd)
    {
        cout << *itBegin << endl;
        itBegin++;
    }
    // 第二种遍历
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
    {
        cout << *it << endl;
    }
    // 第三种遍历, 利用STL提供的遍历算法
    for_each(v.begin(), v.end(), myPring);
}
int main()
{
    test01();
    return 0;
}
```

#### 2.5.2 Vector存放自定义数据类型

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// Vector存放自定义数据类型
class Person
{
public:
    string m_Name;
    int m_Age;
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
};
void test01()
{
    vector<Person> v;
    Person p1("孙悟空", 100);
    Person p2("猪八戒", 80);
    Person p3("唐僧", 30);
    v.push_back(p1);
    v.push_back(p2);
    v.push_back(p3);
    for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
    {
        cout << "姓名：" << (*it).m_Name << " 年龄：" << (*it).m_Age << endl;
        cout << "姓名：" << it->m_Name << " 年龄：" << it->m_Age << endl;
    }
}

int main()
{
    test01();
    return 0;
}
```

#### 2.5.4 Vector容器嵌套容器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// Vector容器嵌套容器
void test01()
{
    vector<vector<int>> v;
    // 小容器
    vector<int> v1;
    vector<int> v2;
    vector<int> v3;
    vector<int> v4;
    // 向小容器中添加元素
    for (int i = 0; i < 4; i++)
    {
        v1.push_back(i + 1);
        v2.push_back(i + 2);
        v3.push_back(i + 3);
        v4.push_back(i + 4);
    }
    // 将小容器添加到大容器中
    v.push_back(v1);
    v.push_back(v2);
    v.push_back(v3);
    v.push_back(v4);
    // 通过大容器, 把所有数据遍历一遍
    for (vector<vector<int>>::iterator it = v.begin(); it != v.end(); it++)
    {
        // (*it) ---- 容器vector<int>
        for (vector<int>::iterator vit = (*it).begin(); vit != (*it).end(); vit++)
        {
            cout << *vit << " ";
        }
        cout << endl;
    }
}

int main()
{
    test01();
    return 0;
}
```

## 3. STL容器

### 3.1 string容器

#### 3.1.1 string基本概念

+ 本质: string是C++风格的字符串, 而string本质上是一个类

#### 3.1.2 string的构造函数

```shell
#include <iostream>
using namespace std;
#include <string>
 
// string的构造函数
void test01()
{
    string s1;                // 默认构造
    string s2("hello world"); // C风格字符串构造
    string s3(s2);            // 拷贝构造
    string s4(11, 'a');       // 指定长度和字符构造
    cout << s1 << endl;
    cout << s2 << endl;
    cout << s3 << endl;
    cout << s4 << endl;
}

int main()
{
    test01();
    return 0;
}
```

#### 3.1.3 string的赋值操作

+ 赋值的函数原型
    1. string& operator=(const char *str);   // char*类型字符串
    2. string& operator=(const string& &s);  // 把字符串s赋值给当前的字符串
    3. string& operator(char c);             // 字符赋值给当前的字符串
    4. string& assign(const char *s);        // 把字符串s赋给当前字符串
    5. string& assign(const char *s, int n); // 把字符串s的前n个字符串赋给当前的字符串
    6. string& assign(const string& s);      // 把字符串s赋给当前字符串
    7. string& assign(int n, char c);        // 将n个字符c赋给当前字符串

```shell
#include <iostream>
using namespace std;
#include <string>

// string的赋值操作
void test01()
{
    string str1 = "hello"; // char*类型字符串赋值给当前的字符串
    cout << "str1 = " << str1 << endl;

    string str2 = str1; // 拷贝构造函数
    cout << "str2 = " << str2 << endl;
    string str3;
    str3 = 'a';
    cout << "str3 = " << str3 << endl;
    string str4;
    str4.assign("hello");
    str4.append("world");
    cout << "str4 = " << str4 << endl;
    string str5;
    str5.assign("hello", 3); // 把字符串"hello"的前3个字符串赋给当前的字符串
    cout << "str5 = " << str5 << endl;
    str5.assign("hello", 3, 2); // 把字符串"hello"的第3个字符串开始，往后的2个字符串赋给当前的字符串
    cout << "str5 = " << str5 << endl;
    string str6;
    str6.assign(str1);
    cout << "str6 = " << str6 << endl;
    string str7;
    str7.assign(10, 'w');
    cout << "str7 = " << str7 << endl;
}

int main()
{
    test01();
    return 0;
}
```

#### 3.1.4 string字符串拼接

+ 实现在字符串末尾拼接字符串
+ 函数原型
    1. string& operator+=(const string& str);           // 重载+=操作符
    2. string& operator+=(const char c);                // 重载+=操作符
    3. string& operator+=(const string& str);           // 重载+=操作符
    4. string& append(const char *s);                   // 把字符串s连接到当前字符串结尾
    5. string& append(const char *s, int n);            // 把字符串s的前n个字符连接到当前字符串结尾
    6. string& append(const string& s);                 // 同operator+=(const string& str)
    7. string& append(const string& s, int pos, int n); // 从pos位置开始的n个字符连接到当前字符串结尾

```shell
#include <iostream>
using namespace std;
#include <string>

// string字符串拼接
void test01()
{
    string str1 = "I like ";
    string str2 = "play games ";
    str1 += str2;
    cout << str1 << endl;
    string str3 = "LOL ";
    str1.append(str3);
    cout << str1 << endl;
    str1.append("DNF DNF", 4);
    cout << str1 << endl;
    string str4 = "CF ";
    str1.append(str4);
    cout << str1 << endl;
    str1.append("abc csgo", 4, -1);
    cout << str1 << endl;
}

int main()
{
    test01();
    return 0;
}
```

#### 3.1.5 string字符串的查找和替换

+ 查找: 查找指定字符串是否存在
+ 替换: 在指定的位置替换字符串

```shell
#include <iostream>
using namespace std;
#include <string>

// string字符串的查找和替换
// 1. 查找
void test01()
{
    string str1 = "abcdefgde";
    int pos = str1.find("de");
    cout << "pos = " << pos << endl; // find()从左往右找
    pos = str1.rfind("de");
    cout << "pos = " << pos << endl; // rfind()从右往左找
}
// 2. 替换
void test02()
{
    string str1 = "abcdefgde";
    str1.replace(1, 3, "1111111111"); // 把1号位置起3个字符替换成1111111111
    cout << "str1 = " << str1 << endl;
}

int main()
{
    test01();
    test02();
    return 0;
}
```

#### 3.1.6 string字符串比较

+ 比较方式: 比较是按字符串的ASCII码值大小比较的
    1. "=" 返回 0
    2. ">" 返回 1
    3. "<" 返回 -1

```shell
#include <iostream>
using namespace std;
#include <string>

// string字符串比较
void test01()
{
    string str1 = "hello";
    string str2 = "hello";
    if (str1.compare(str2) == 0)
    {
        cout << "str1 == str2" << endl;
    }
    else if (str1.compare(str2) > 0)
    {
        cout << "str1 > str2" << endl;
    }
    else
    {
        cout << "str1 < str2" << endl;
    }
}
int main()
{
    test01();
    return 0;
}
```

#### 3.1.7 string字符存取

+ 函数原型
    1. char& operator[](int n); // 重载[]操作符
    2. char& at(int n);         // 通过at方法获取字符

```shell
#include <iostream>
using namespace std;
#include <string>

// string字符存取
void test01()
{
    string str = "hello";
    cout << "str = " << str << endl;
    // 1. 通过[]访问单个字符
    for (int i = 0; i < str.size(); i++)
    {
        cout << str[i] << " ";
    }
    cout << endl;
    // 2. 通过at访问单个字符
    for (int i = 0; i < str.size(); i++)
    {
        cout << str.at(i) << " ";
    }
    cout << endl;
    // 修改单个字符
    str[0] = 'x';
    cout << "str = " << str << endl;
    str.at(1) = 'x';
    cout << "str = " << str << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.1.8 string字符串的插入和删除

+ 函数原型
    1. string& insert(int pos, const char *s);     // 在pos位置插入字符串s
    2. string& insert(int pos, const string& str); // 在pos位置插入字符串str
    3. string& insert(int pos, int n, char c);     // 在pos位置插入n个字符c
    4. string& erase(int pos, int n = npos);       // 删除从pos开始的n个字符

```shell
#include <iostream>
using namespace std;
#include <string>

// string字符串的插入和删除
void test01()
{
    string str = "hello world";
    str.insert(0, "the ");
    str.insert(0, string("what is "));
    cout << str << endl;
    str.erase(0, 8);
    cout << str << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.1.9 string子串

+ 功能描述: 从字符串中获取子串
+ 函数原型
    1. string substr(int pos = 0, int n = npos) const; // 返回由pos开始的n个字符组成的字符串

```shell
#include <iostream>
using namespace std;
#include <string>

// string子串
void test01()
{
    string str = "hello world";
    string substr = str.substr(0, 5);
    cout << "substr = " << substr << endl;
}
// 使用操作
void test02()
{
    string email = "xiaoming@qq.com";
    // 从邮件中获取用户名信息
    int pos = email.find("@");
    string name = email.substr(0, pos);
    cout << "name = " << name << endl;
}

int main()
{
    test01();
    test02();
    return 0;
}
```

### 3.2 vector容器

#### 3.2.1 vector基本概念

+ 功能: vector数据结构和数组非常相似, 也称为单端数组
+ vector与普通数组区别: 不同之处在于数组是静态空间, 而vector可以动态扩展
+ 动态扩展: 并不是在原空间之后继续接新空间, 而是找更大的内存空间, 然后将原来数据拷贝到新空间中, 再释放原空间

#### 3.2.2 vector构造函数

+ 函数原型
    1. vector《T》v;                // 采用模版类实现， 默认构造函数
    2. vector(v.begin(), v.end()); // 将v(begin(), v.end())区间中的元素拷贝给本身
    3. vector(n, elem);            //将构造函数将n个elem拷贝给本身
    4. vector(const vector &v);    // 拷贝构造函数

```shell
#include <iostream>
using namespace std;
#include <vector>

void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
    {
        cout << *it << " ";
    }
    cout << endl;
}
// vector构造函数
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);
    // 通过区间方式进行构造
    vector<int> v2(v1.begin(), v1.end());
    printVector(v2);
    // n个elem方式构造
    vector<int> v3(5, 100);
    printVector(v3);
    // 拷贝构造
    vector<int> v4(v3);
    printVector(v4);
}

int main()
{
    test01();
    return 0;
}
```

#### 3.2.3 vector赋值操作

+ 函数原型
    1. vector& operator=(const vector &v); //重载等号操作符
    2. assign(begin, end);                 // 将[begin, end)区间中的数据拷贝赋值给本身
    3. assign(n, elem);                    // 将n个elem拷贝赋值给本身

```shell
#include <iostream>
using namespace std;
#include <vector>

void printVector(vector<int> &v)
{
    for (auto x : v)
    {
        cout << x << " ";
    }
    cout << endl;
}
// vector赋值操作
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);
    // 赋值 operator=
    vector<int> v2;
    v2 = v1;
    printVector(v2);
    // 赋值 assign
    vector<int> v3;
    v3.assign(v1.begin(), v1.end());
    printVector(v3);
    // n个elem方式赋值
    vector<int> v4;
    v4.assign(5, 100);
    printVector(v4);
}

int main()
{
    test01();
    return 0;
}
```

#### 3.2.4 vector容量和大小

+ 函数原型
    1. empty();               // 判断容器是否为空
    2. capacity();            // 容器的容量
    3. size();                // 返回容器中元素的个数
    4. resize(int num);       //重新指定容器的长度为num, 如果容器变长, 新位置的元素默认初始化
    5. resize(int num, elem); //重新指定容器的长度为num, 如果容器变长, 新位置的元素初始化为elem, 如果容器变短, 容器中多出的元素被删除

```shell
#include <iostream>
using namespace std;
#include <vector>

void printVector(vector<int> &v)
{
    for (auto x : v)
    {
        cout << x << " ";
    }
    cout << endl;
}
// vector容量和大小
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);
    if (v1.empty())
    {
        cout << "v1为空" << endl;
    }
    else
    {
        cout << "v1不为空" << endl;
        cout << "v1的容量为: " << v1.capacity() << endl;
        cout << "v1的大小为: " << v1.size() << endl;
    }
    // 重新指定大小
    v1.resize(15, 100); // 如果重新指定的比原来的长, 默认用0填充, 这里设置100填充
    printVector(v1);
    v1.resize(5); // 如果重新指定的比原来的短, 超出部分会删除掉
    printVector(v1);
}

int main()
{
    test01();
    return 0;
}
```

#### 3.2.5 vector插入和删除

+ 函数原型
    1. push_back(ele); // 在容器尾部添加元素
    2. pop_back();                                      // 删除容器最后一个元素
    3. insert(const_iterator ois, ele);                 // 迭代器指向位置pos处, 插入元素ele
    4. insert(const_iterator pos, int count, ele)       // 迭代器指向位置pos处, 插入count个元素ele
    5. erase(const_iterator pos); // 删除迭代器指向的元素
    6. erase(const_iterator start, const_iterator end); // 删除迭代器start到end之间的元素
    7. clear();                                         // 删除容器中所有元素

```shell
#include <iostream>
using namespace std;
#include <vector>

void printVector(vector<int> &v)
{
    for (auto x : v)
    {
        cout << x << " ";
    }
    cout << endl;
}
// vector插入和删除
void test01()
{
    vector<int> v1;
    for (int i = 1; i < 6; i++)
    {
        v1.push_back(i * 10);
    }
    printVector(v1);
    // 尾删
    v1.pop_back();
    printVector(v1);
    // 插入
    v1.insert(v1.begin(), 100); // 第一个参数是迭代器
    printVector(v1);
    v1.insert(v1.begin(), 2, 1000);
    printVector(v1);
    // 删除
    v1.erase(v1.begin());
    printVector(v1);
    v1.erase(v1.begin(), v1.end()); // 相当于清空
    printVector(v1);
    v1.clear();
    printVector(v1);
}

int main()
{
    test01();
    return 0;
}
```

#### 3.2.6 vector数据存取

+ 函数原型
    1. at(int idx);              // 返回索引idx所指的数据
    2. operator[];               // 返回索引idx所指的数据
    3. front();                  // 返回容器中第一个数据元素
    4. back();                   // 返回容器中最后一个数据元素

```shell
#include <iostream>
using namespace std;
#include <vector>

// vector数据存取
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    // 利用迭代器访问元素
    for (auto x : v1)
    {
        cout << x << " ";
    }
    cout << endl;
    // 利用[]访问元素
    for (int i = 0; i < v1.size(); i++)
    {
        cout << v1[i] << " ";
    }
    cout << endl;
    // 利用at访问元素
    for (int i = 0; i < v1.size(); i++)
    {
        cout << v1.at(i) << " ";
    }
    cout << endl;
    // 获取第一个元素
    cout << "第一个元素：" << v1.front() << endl;
    // 获取最后一个元素
    cout << "最后一个元素: " << v1.back() << endl;
}

int main()
{
    test01();
    return 0;
}
```

#### 3.2.7 vector互换容器

+ 函数原型
    1. swap(v); // 将v与本身的元素互换

```shell
#include <iostream>
using namespace std;
#include <vector>

// vector互换容器
void printVector(vector<int> &v)
{
    for (auto x : v)
    {
        cout << x << " ";
    }
    cout << endl;
}
// 1. 基本使用
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);
    vector<int> v2;
    for (int i = 10; i > 0; i--)
    {
        v2.push_back(i);
    }
    cout << "交换前: " << endl;
    printVector(v2);
    v1.swap(v2);
    cout << "交换后: " << endl;
    printVector(v1);
    printVector(v2);
}
// 2. 实际用途: 巧用swap可以收缩内存空间
void test02()
{
    vector<int> v;
    for (int i = 0; i < 100000; i++)
    {
        v.push_back(i);
    }
    cout << "v的容量: " << v.capacity() << endl;
    cout << "v的大小: " << v.size() << endl;
    v.resize(3);
    cout << "v的容量: " << v.capacity() << endl;
    cout << "v的大小: " << v.size() << endl;
    // 巧用swap收缩内存空间
    vector<int>(v).swap(v); // vector<int>(v) 创建一个匿名对象, 再用swap收缩内存空间, 因为匿名对象执行完就会自动释放空间
    cout << "v的容量: " << v.capacity() << endl;
    cout << "v的大小: " << v.size() << endl;
    printVector(v);
}

int main()
{
    test01();
    test02();
    return 0;
}
```

#### 3.2.8 vector预留空间

+ 函数原型
    1. reserve(int num); // 预留容器空间, 不会改变容器的大小, 预留的容器大小不会小于num

```shell
#include <iostream>
using namespace std;
#include <vector>

// vector预留空间
void printVector(vector<int> &v)
{
    for (auto x : v)
    {
        cout << x << " ";
    }
    cout << endl;
}
void test01()
{
    vector<int> v;
    // 利用reserve提前指定容器的容量
    v.reserve(100000);
    int num = 0;
    int *p = NULL;
    for (int i = 0; i < 100000; i++)
    {
        v.push_back(i);
        if (p != &v[0])
        {
            p = &v[0];
            num++;
        }
    }
    cout << "capacity:" << v.capacity() << endl;
    cout << "size:" << v.size() << endl;
    cout << num << endl;
}

int main()
{
    test01();
    return 0;
}
```

### 3.3 deque容器

#### 3.3.1 deque容器基本概念

+ 功能: 双端数组, 可以对头端进行插入删除操作
+ deque与vector的区别
    1. vector是数组, 是静态空间, 插入删除效率低
    2. deque是双端数组, 是动态空间, 插入删除效率高
    3. vector访问元素时的速度比deque快, 这和两者内部实现有关

#### 3.3.2 deque构造函数

+ 函数原型
    1. deque《T》 deqT;          // 默认构造函数
    2. deque(beg, end);         // 构造函数将[beg, end)区间中的元素拷贝给本身)
    3. deque(n, elem);          // 构造函数将n个elem拷贝给本身
    4. deque(const deque &deq); // 拷贝构造函数

```shell
#include <iostream>
using namespace std;
#include <deque>

void printDeque(const deque<int> &d)
{
    for (auto x : d)
    {
        cout << x << " ";
    }
    cout << endl;
}
// deque构造函数
void test01()
{
    deque<int> d1;
    for (int i = 0; i < 10; i++)
    {
        d1.push_back(i);
    }
    printDeque(d1);
    deque<int> d2(d1.begin(), d1.end());
    printDeque(d2);
    deque<int> d3(5, 100);
    printDeque(d3);
    deque<int> d4(d3);
    printDeque(d4);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.3.3 deque赋值操作

+ 函数原型
    1. deque &operator=(const deque &deq); // 重载等号操作符
    2. assign(beg, end);                   // 将[beg, end)区间中的数据拷贝赋值给本身
    3. assign(n, elem);                    // 将n个elem拷贝赋值给本身

```shell
#include <iostream>
using namespace std;
#include <deque>

void printDeque(const deque<int> &d)
{
    for (auto x : d)
    {
        cout << x << " ";
    }
    cout << endl;
}
// deque赋值操作
void test01()
{
    deque<int> d1;
    for (int i = 0; i < 10; i++)
    {
        d1.push_back(i);
    }
    printDeque(d1);
    // operator赋值
    deque<int> d2;
    d2 = d1;
    printDeque(d2);
    // assign赋值
    deque<int> d3;
    d3.assign(d1.begin(), d1.end());
    printDeque(d3);
    deque<int> d4;
    d4.assign(5, 100);
    printDeque(d4);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.3.4 deque大小操作

+ 函数原型
    1. empty();             // 判断容器是否为空
    2. size();              // 返回容器中元素的数目
    3. resize(num);         // 将容器中元素个数改变为num
    4. resize(num, elem);   // 将容器中元素个数改变为num, 并将每个元素初始化为elem

```shell
#include <iostream>
using namespace std;
#include <deque>

void printDeque(const deque<int> &d)
{
    for (auto x : d)
    {
        cout << x << " ";
    }
    cout << endl;
}
// deque赋值操作
void test01()
{
    deque<int> d1;
    for (int i = 0; i < 10; i++)
    {
        d1.push_back(i);
    }
    printDeque(d1);
    if (d1.empty())
    {
        cout << "d1为空" << endl;
    }
    else
    {
        cout << "d1不为空" << endl;
        cout << "d1的大小为: " << d1.size() << endl;
        cout << "d1的第一个元素为: " << d1.front() << endl;
        cout << "d1的最后一个元素为: " << d1.back() << endl;
    }
    // 重新指定大小
    d1.resize(15, 100); // 默认值为0填充, 这里设置为100
    printDeque(d1);
    d1.resize(5);
    printDeque(d1);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.3.5 deque插入和删除

+ 函数原型
    1. push_back(elem);                             // 在容器尾部添加元素
    2. pop_back();                                  // 删除容器最后一个元素
    3. push_front(elem);                            // 在容器头部添加元素
    4. pop_front();                                 // 删除容器第一个元素
    5. insert(const_iterator pos, elem);            // 在pos位置插入elem元素的拷贝, 返回新数据的位置
    6. insert(const_iterator pos, int count, elem); // 在pos位置插入count个elem数据
    7. erase(const_iterator pos, beg, end);         // 在pos位置插入[beg, end)区间的数据, 无返回值
    8. erase(beg, end);                             // 删除[beg, end)区间的数据, 返回删除数据的最后一个位置的next()
    9. erase(const_iterator pos);                   // 删除pos位置的元素, 返回下一个元素的位置
    10. clear();                                    // 删除容器中所有数据

```shell
#include <iostream>
using namespace std;
#include <deque>

void printDeque(const deque<int> &d)
{
    for (auto x : d)
    {
        cout << x << " ";
    }
    cout << endl;
}
// deque插入和删除
void test01()
{
    deque<int> d1;
    for (int i = 3; i > 0; i--)
    {
        d1.push_front(i); // 头插
        d1.push_back(i);  // 尾插
    }
    printDeque(d1);
    d1.pop_back();  // 尾删
    d1.pop_front(); // 头删
    printDeque(d1);
    d1.insert(d1.begin(), 10);    // insert插入1个10
    d1.insert(d1.begin(), 2, 10); // insert插入2个10
    printDeque(d1);
    d1.insert(d1.begin(), d1.end() - 2, d1.end()); // insert插入d1.end()-2到d1.end()之间的元素
    printDeque(d1);
    d1.erase(d1.begin()); // erase删除
    printDeque(d1);
    d1.erase(d1.begin(), d1.end() - 2); // erase删除d1.begin()到d1.end()-2之间的元素
    printDeque(d1);
    d1.clear(); // 清空
    printDeque(d1);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.3.6 deque数据存取

+ 函数原型
    1. at(int idx);  // 返回索引idx所指的数据
    2. operator[];  // 返回索引idx所指的数据
    3. front();     // 返回容器中第一个数据元素
    4. back();      // 返回容器中最后一个数据元素

```shell
#include <iostream>
using namespace std;
#include <deque>

// deque数据存取
void test01()
{
    deque<int> d1;
    for (int i = 5; i > 0; i--)
    {
        d1.push_front(i); // 头插
    }
    // 通过[]访问
    for (int i = 0; i < d1.size(); i++)
    {
        cout << d1[i] << " ";
    }
    cout << endl;
    // 通过at访问
    for (int i = 0; i < d1.size(); i++)
    {
        cout << d1.at(i) << " ";
    }
    cout << endl;
    cout << "d1.front():" << d1.front() << endl;
    cout << "d1.back():" << d1.back() << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.3.7 deque排序

+ 函数原型
    1. sort(iterator beg, iterator end); // 将容器中的数据进行排序

```shell
#include <iostream>
using namespace std;
#include <deque>
#include <algorithm> // 标准库算法

void printDeque(deque<int> &d)
{
    for (auto x : d)
    {
        cout << x << " ";
    }
    cout << endl;
}
// deque排序
void test01()
{
    deque<int> d1;
    d1.push_back(10);
    d1.push_back(20);
    d1.push_front(100);
    d1.push_front(200);
    printDeque(d1);
    // 对于支持随机访问迭代器的容器，都可以使用标准库算法
    sort(d1.begin(), d1.end()); // 升序, 默认从小到大
    printDeque(d1);
    sort(d1.begin(), d1.end(), greater<int>()); // 降序
    printDeque(d1);
}
int main()
{
    test01();
    return 0;
}
```

### 3.4 STL案例

#### 3.4.1 评委打分案例

```shell
#include <iostream>
using namespace std;
#include <deque>
#include <vector>
#include <algorithm> // 标准库算法
#include <ctime>
// 评委打分
// 选手类
class Person
{
public:
    string m_Name;
    int m_Score;
    Person(string name, int score)
    {
        this->m_Name = name;
        this->m_Score = score;
    }
};
void createPerson(vector<Person> &v)
{
    for (int i = 0; i < 5; i++)
    {
        string name = "选手";
        string nameSeed = "ABCDE";
        name += nameSeed[i];
        int score = rand() % 41 + 60;
        Person p(name, score);
        v.push_back(p);
    }
}
void setScore(vector<Person> &v)
{
    for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
    {
        deque<int> d;
        for (int i = 0; i < 10; i++)
        {
            int score = rand() % 41 + 60;
            d.push_back(score);
        }
        // 排序
        sort(d.begin(), d.end());
        // 去掉最高分和最低分
        d.pop_front();
        d.pop_back();
        // 计算平均分
        int sum = 0;
        cout << (*it).m_Name << "选手的分数为: " << endl;
        for (int i = 0; i < d.size(); i++)
        {
            sum += d[i];
            cout << d[i] << " ";
        }
        cout << endl;
        (*it).m_Score = sum / d.size();
        cout << "选手" << (*it).m_Name << "的平均得分为: " << (*it).m_Score << endl;
    }
}
void showPerson(const vector<Person> &v)
{
    for (vector<Person>::const_iterator it = v.begin(); it != v.end(); it++)
    {
        cout << "姓名: " << it->m_Name << " 分数: " << it->m_Score << endl;
    }
}
int main()
{
    srand((unsigned int)time(NULL));
    // 1. 创建5名选手, 放到vector中
    vector<Person> v;
    createPerson(v);
    // 2. 遍历vector容器, 取出来每一个选手, 执行for循环, 可以把10个评分放到deque中
    setScore(v);
    showPerson(v);
    // 3. sort算法对deque容器中分数排序, 去除最高分和最低分
    // 4. deque容器遍历一遍, 累加总分
    // 5. 计算平均分
    return 0;
}
```

### 3.5 stack容器

#### 3.5.1 stack基本概念

+ stack是一种**后进先出**的容器

#### 3.5.2 stack常用接口

+ 构造函数
    1. stack《T》 stk;  // 默认构造函数
    2. stack《T》 stk(const stack《T》& stk); // 拷贝构造函数
+ 成员函数
    1. stack& operator=(const stack& stk);  // 重载等号操作符
+ 数据存取
    1. push(elem); // 向栈顶添加元素
    2. pop();      // 弹出栈顶元素
    3. top();      // 返回栈顶元素
+ 大小操作
    1. empty(); // 判断栈是否为空
    2. size();  // 返回栈的大小

```shell
#include <iostream>
using namespace std;
#include <stack>

// stack容器
void test01()
{
    stack<int> s;
    for (int i = 0; i < 10; i++)
        s.push(i);
    cout << "stack的大小: " << s.size() << endl;
    while (!s.empty())
    {
        cout << s.top() << " ";
        s.pop();
    }
    cout << endl;
    cout << "stack的大小: " << s.size() << endl;
}
int main()
{
    test01();
    return 0;
}
```

### 3.6 queue容器

#### 3.6.1 queue基本概念

+ queue是一种**先进先出**的容器, 入队push, 出队pop
+ queue容器中的数据是**不允许重复的**, 只有队首和队尾才能进行操作

#### 3.6.2 queue常用接口

+ 构造函数
    1. queue《T》 que;  // 默认构造函数
    2. queue《T》 que(const queue《T》& que); // 拷贝构造函数
+ 赋值操作
    1. queue& operator=(const queue& que);  // 重载等号操作符
+ 数据存取
    1. push(elem); // 向队尾添加元素
    2. pop();      // 弹出队首元素
    3. back();     // 返回队尾元素
    4. front();    // 返回队首元素
+ 大小操作
    1. empty(); // 判断队列是否为空
    2. size();  // 返回队列的大小

```shell
#include <iostream>
using namespace std;
#include <queue>
#include <string>

// queue容器
class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    string m_Name;
    int m_Age;
};
void test01()
{
    queue<Person> q;
    Person p1("ming", 18);
    Person p2("hong", 19);
    Person p3("wang", 20);
    q.push(p1);
    q.push(p2);
    q.push(p3);
    while (!q.empty())
    {
        // 查看队首元素
        cout << "name: " << q.front().m_Name
             << ", age: " << q.front().m_Age << endl;
        // 查看队尾元素
        cout << "name: " << q.back().m_Name
             << ", age: " << q.back().m_Age << endl;
        q.pop();
    }
}
int main()
{
    test01();
    return 0;
}
```

### 3.7 list容器

#### 3.7.1 list基本概念

+ list是一种**双向列表**, 是一种**可插入和删除的线性表**
+ 链表的优点: 插入和删除元素时, 时间复杂度为O(1)
+ 链表的缺点: 查找元素时, 时间复杂度为O(n), 占用的空间比d数组大
+ 插入操作和删除操作, 都不会造成原有list迭代器的失效, 这在vector是不成立的

#### 3.7.2 listh构造函数

+ 函数原型
    1. list《T》 lst;        // 默认构造函数
    2. list(beg, end);      // 构造函数将[beg, end)区间中的元素拷贝给本身
    3. list(n, elem);       // 构造函数将n个elem拷贝给本身
    4. list(const list& l); // 拷贝构造函数

```shell
#include <iostream>
using namespace std;
#include <list>

// list容器构造函数
void printList(const list<int> l)
{
    for (list<int>::const_iterator it = l.begin(); it != l.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    list<int> l1;
    for (int i = 0; i < 10; i++)
        l1.push_back(i);
    printList(l1);
    // 区间方式构造
    list<int> l2(l1.begin(), l1.end());
    printList(l2);
    // 拷贝构造
    list<int> l3(l2);
    printList(l3);
    // n个elem方式构造
    list<int> l4(5, 100);
    printList(l4);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.7.3 list赋值和交换

+ 函数原型
    1. assign(beg, end); // 将[beg, end)区间中的数据拷贝赋值给本身
    2. assign(n, elem);  // 将n个elem拷贝赋值给本身
    3. list& operator=(const list& lst); // 重载等号操作符
    4. swap(lst); // 将l与本身的元素互换

```shell
#include <iostream>
using namespace std;
#include <list>

// list赋值和交换
void printList(const list<int> l)
{
    for (list<int>::const_iterator it = l.begin(); it != l.end(); it++)
        cout << *it << " ";
    cout << endl;
}
// 赋值
void test01()
{
    list<int> l1;
    for (int i = 0; i < 10; i++)
        l1.push_back(i);
    printList(l1);
    list<int> l2;
    l2 = l1; // operator=赋值
    printList(l2);
    list<int> l3;
    l3.assign(l2.begin(), l2.end());
    printList(l3);
    list<int> l4;
    l4.assign(5, 100);
    printList(l4);
}
// 交换
void test02()
{
    list<int> l1;
    for (int i = 0; i < 10; i++)
        l1.push_back(i);
    cout << "交换前： " << endl;
    printList(l1);
    list<int> l2;
    l2.assign(5, 100);
    printList(l2);
    l1.swap(l2);
    cout << "交换后： " << endl;
    printList(l1);
    printList(l2);
}
int main()
{
    // test01();
    test02();
    return 0;
}
```

#### 3.7.4 list大小操作

+ 函数原型
    1. size(); // 返回容器中元素的数目
    2. empty(); // 判断容器是否为空
    3. resize(num); // 将容器resize到num大小
    4. resize(num, elem); // 将容器resize到num大小, 并将新元素赋值为elem

```shell
#include <iostream>
using namespace std;
#include <list>
void printList(const list<int> l)
{
    for (list<int>::const_iterator it = l.begin(); it != l.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    list<int> l1;
    for (int i = 0; i < 10; i++)
        l1.push_back(i);
    if (l1.empty())
    {
        cout << "l1为空" << endl;
    }
    else
    {
        cout << "l1不为空" << endl;
        cout << "l1的元素个数为: " << l1.size() << endl;
        printList(l1);
    }
    // 重新指定大小
    l1.resize(5);
    printList(l1);
    l1.resize(10, 5);
    printList(l1);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.7.5 list插入和删除

+ 函数原型
    1. push_back(elem); // 在容器尾部添加元素
    2. pop_back(); // 删除容器中最后一个元素
    3. push_front(elem); // 在容器头部添加元素
    4. pop_front(); // 删除容器中最前元素
    5. insert(pos, elem); // 在pos位置插入elem元素的拷贝, 返回新数据的位置
    6. insert(pos, n, elem); // 在pos位置插入n个elem数据
    7. insert(pos, beg, end); // 在pos位置插入[beg, end)区间的数据
    8. clear(); // 删除容器中所有数据
    9. erase(beg, end); // 删除[beg, end)区间的数据
    10. erase(pos); // 删除pos位置的数据
    11. remove(elem); // 删除容器中所有与elem值相等的元素

```shell
#include <iostream>
using namespace std;
#include <list>

// list插入和删除
void printList(const list<int> l)
{
    for (list<int>::const_iterator it = l.begin(); it != l.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    list<int> l1;
    for (int i = 0; i < 5; i++)
    {
        l1.push_front(i);
        l1.push_back(i);
    }
    printList(l1);
    l1.pop_back(); // 删除尾部
    printList(l1);
    l1.pop_front(); // 删除头部
    printList(l1);
    l1.insert(l1.begin(), 100); // 插入
    printList(l1);
    l1.erase(++l1.begin()); // 删除
    printList(l1);
    l1.remove(0); // 移除所有0
    printList(l1);
    l1.clear();
    printList(l1); // 清空
}
int main()
{
    test01();
    return 0;
}
```

#### 3.7.6 list数据存取

+ 函数原型
    1. front(); // 返回第一个元素
    2. back();  // 返回最后一个元素

```shell
#include <iostream>
using namespace std;
#include <list>

// list数据存取
void printList(const list<int> l)
{
    for (list<int>::const_iterator it = l.begin(); it != l.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    list<int> l1;
    for (int i = 0; i < 5; i++)
        l1.push_back(i);
    printList(l1);
    cout << "front: " << l1.front() << endl;
    cout << "back: " << l1.back() << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.7.7 list反转和排序

+ 函数原型
    1. reverse(); // 翻转链表
    2. sort();    // 链表排序

```shell
#include <iostream>
using namespace std;
#include <list>

// list插入和删除
void printList(const list<int> l)
{
    for (list<int>::const_iterator it = l.begin(); it != l.end(); it++)
        cout << *it << " ";
    cout << endl;
}
bool myCompare(int v1, int v2)
{
    return v1 > v2; // 降序
}
void test01()
{
    list<int> l1;
    for (int i = 0; i < 5; i++)
    {
        l1.push_front(i);
        l1.push_back(i + 5);
    }
    cout << "反转前:" << endl;
    printList(l1);
    l1.reverse();
    cout << "反转后:" << endl;
    printList(l1);
    cout << "排序后:" << endl;
    l1.sort(); // 默认升序
    printList(l1);
    l1.sort(myCompare); // 降序
    printList(l1);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.7.8 排序案例

```shell
#include <iostream>
using namespace std;
#include <list>

class Person
{
public:
    string m_Name;
    int m_Age;
    int m_Height;
    Person(string name, int age, int height)
    {
        this->m_Name = name;
        this->m_Age = age;
        this->m_Height = height;
    }
};
void printPerson(const list<Person> &l)
{
    for (list<Person>::const_iterator it = l.begin(); it != l.end(); it++)
        cout << "name: " << (*it).m_Name << " age: " << (*it).m_Age << " height: " << (*it).m_Height << endl;
}
// 指定排序规则
bool comparePerson(const Person &p1, const Person &p2)
{
    if (p1.m_Age == p2.m_Age)
        return p1.m_Height > p2.m_Height;
    else
        return p1.m_Age < p2.m_Age;
}
void test01()
{
    list<Person> l1;
    Person p1("ming", 18, 185);
    Person p2("hong", 19, 170);
    Person p3("wang", 20, 175);
    Person p4("qing", 20, 165);
    Person p5("long", 19, 165);
    Person p6("zhao", 20, 190);
    l1.push_back(p1);
    l1.push_back(p2);
    l1.push_back(p3);
    l1.push_back(p4);
    l1.push_back(p5);
    cout << "排序前:" << endl;
    printPerson(l1);
    cout << "排序后:" << endl;
    l1.sort(comparePerson);
    printPerson(l1);
}
int main()
{
    test01();
    return 0;
}
```

### 3.8 set/multiset容器

#### 3.8.1 set基本概念

+ 所有元素都会在插入时自动排序
+ set/multiset属于关联式容器，底层结构是二叉树
+ set和multiset区别
    1. set不允许容器中有重复元素
    2. multiset允许容器中有重复元素

#### 3.8.2 set构造和赋值

+ 构造
    1. set《T》 set1; // 默认构造
    2. set(const set& set1) // 拷贝构造
+ 赋值
    1. set& operator=(const set& set1); // 赋值操作符重载

```shell
#include <iostream>
using namespace std;
#include <set>

void printSet(const set<int> &s)
{
    for (set<int>::const_iterator it = s.begin(); it != s.end(); it++)
        cout << *it << " ";
    cout << endl;
}
// set构造和赋
void test01()
{
    set<int> s1;
    // 插入数据只有insert方式
    s1.insert(20);
    s1.insert(10);
    s1.insert(30);
    s1.insert(20);
    // 遍历容器
    // set容器特点: 所有元素插入时候自动被排序
    // set容器不允许容器中有重复元素
    printSet(s1);
    // 拷贝构造
    set<int> s2(s1);
    printSet(s2);
    // 赋值
    set<int> s3;
    s3 = s2;
    printSet(s3);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.8.3 set大小和交换

+ 函数原型
    1. size(); // 返回容器中元素的数目
    2. empty(); // 判断容器是否为空
    3. swap(set1, set2); // 将set1和set2交换

```shell
#include <iostream>
using namespace std;
#include <set>

void printSet(const set<int> &s)
{
    for (set<int>::const_iterator it = s.begin(); it != s.end(); it++)
        cout << *it << " ";
    cout << endl;
}
// set大小和交换
// 大小
void test01()
{
    set<int> s1;
    // 插入数据只有insert方式
    s1.insert(20);
    s1.insert(10);
    s1.insert(30);
    printSet(s1);
    if (s1.empty())
        cout << "s1为空" << endl;
    else
    {
        cout << "s1不为空" << endl;
        cout << "s1的大小为: " << s1.size() << endl;
    }
}
// 交换
void test02()
{
    set<int> s1;
    s1.insert(10);
    s1.insert(20);
    s1.insert(30);
    s1.insert(40);
    printSet(s1);
    set<int> s2;
    s2.insert(100);
    s2.insert(200);
    s2.insert(300);
    cout << "交换前" << endl;
    printSet(s2);
    s1.swap(s2);
    cout << "交换后" << endl;
    printSet(s2);
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 3.8.4 set插入和删除

+ 函数原型
    1. insert(elem) // 插入元素
    2. clear(); // 清空容器
    3. erase(pos); // 删除指定位置的元素, 返回下一个元素的迭代器
    4. erase(beg, end); // 删除指定元素, 返回下一个元素的迭代器
    5. erase(elem); // 删除容器中指为elem的元素

```shell
#include <iostream>
using namespace std;
#include <set>

void printSet(const set<int> &s)
{
    for (set<int>::const_iterator it = s.begin(); it != s.end(); it++)
        cout << *it << " ";
    cout << endl;
}
// set插入和删除
void test01()
{
    set<int> s1;
    // 插入数据只有insert方式
    s1.insert(20);
    s1.insert(10);
    s1.insert(30);
    s1.insert(40);
    printSet(s1);
    // 删除数据只有erase方式
    s1.erase(s1.begin());
    printSet(s1);
    s1.erase(20);
    printSet(s1);
    s1.erase(s1.begin(), s1.end()); // 相当于清空
    printSet(s1);
    s1.clear();
    printSet(s1); // 清空
}
int main()
{
    test01();
    return 0;
}
```

#### 3.8.5 set查找和统计

+ 函数原型
    1. find(key); // 查找key是否存在, 如果存在, 返回该元素的迭代器, 否则返回set.end()
    2. count(key); // 查找key的个数

```shell
#include <iostream>
using namespace std;
#include <set>

void printSet(const set<int> &s)
{
    for (set<int>::const_iterator it = s.begin(); it != s.end(); it++)
        cout << *it << " ";
    cout << endl;
}
// set查找和统计
void test01()
{
    set<int> s1;
    s1.insert(20);
    s1.insert(10);
    s1.insert(30);
    s1.insert(30);
    set<int>::iterator pos = s1.find(30);
    if (pos != s1.end())
        cout << "找到元素：" << *pos << endl;
    else
        cout << "未找到元素" << endl;
    int num = s1.count(30);
    cout << "30出现了" << num << "次" << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.8.6 set和multiset区别

+ 区别
    1. set不允许容器中有重复元素, 而multiset允许容器中有重复元素
    2. set插入数据的同时会返回插入结果, 表示插入是否成功
    3. multiset不会检测数据, 因此可以插入重复数据

```shell
#include <iostream>
using namespace std;
#include <set>

void printSet(const set<int> &s)
{
    for (set<int>::const_iterator it = s.begin(); it != s.end(); it++)
        cout << *it << " ";
    cout << endl;
}
// set和multiset区别
void test01()
{
    set<int> s1;
    pair<set<int>::iterator, bool> ret = s1.insert(10);
    if (ret.second)
        cout << "第一次插入成功" << endl;
    else
        cout << "第一次插入失败" << endl;
    ret = s1.insert(10);
    if (ret.second)
        cout << "第二次插入成功" << endl;
    else
        cout << "第二次插入失败" << endl;
    multiset<int> ms; // 允许插入重复元素
    ms.insert(10);
    ms.insert(10);
    for (multiset<int>::iterator it = ms.begin(); it != ms.end(); it++)
        cout << *it << " ";
}
int main()
{
    test01();
    return 0;
}
```

#### 3.8.7 pair队组创建

+ 功能描述
    1. 成对出现的数据, 利用队组可以返回两个数据

+ 两种创建方式
    1. pair《type, type》p(value1, value2);
    2. pair《type, type》p = make_pair(value1, value2);

```shell
#include <iostream>
using namespace std;
#include <string>

// pair队组创建
void test01()
{
    // 第一种创建方式
    pair<string, int> p("ming", 18);
    cout << "name: " << p.first << ", age: " << p.second << endl;
    // 第二种创建方式
    pair<string, int> p2 = make_pair("xing", 19);
    cout << "name: " << p2.first << ", age: " << p2.second << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.8.8 set容器排序

+ set容器默认排序规则为从小到大
+ 利用仿函数, 可以改变排序规则

```shell
#include <iostream>
using namespace std;
#include <set>

void printSet(set<int> &s)
{
    for (set<int>::iterator it = s.begin(); it != s.end(); it++)
        cout << *it << " ";
    cout << endl;
}
// set容器排序
class MyCompare
{
public:
    bool operator()(int v1, int v2) const
    {
        return v1 > v2;
    }
};
void test01()
{
    set<int> s1;
    s1.insert(10);
    s1.insert(30);
    s1.insert(20);
    s1.insert(40);
    printSet(s1);
    // 指定排序规则为从大到小
    set<int, MyCompare> s2;
    s2.insert(10);
    s2.insert(20);
    s2.insert(40);
    s2.insert(30);
    for (set<int, MyCompare>::iterator it = s2.begin(); it != s2.end(); it++)
        cout << *it << " ";
    cout << endl;
    // 自带greater功能
    set<int, greater<int>> s3;
    s3.insert(10);
    s3.insert(20);
    s3.insert(40);
    s3.insert(30);
    for (set<int, greater<int>>::iterator it = s3.begin(); it != s3.end(); it++)
        cout << *it << " ";
    cout << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.8.9 set存放自定义数据类型的排序

+ 利用仿函数, 可以改变排序规则

```shell
#include <iostream>
using namespace std;
#include <string>
#include <set>

// set容器排序, 存放自定义数据类型
class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    string m_Name;
    int m_Age;
};
class MyCompare
{
public:
    bool operator()(const Person &p1, const Person &p2) const
    {
        return p1.m_Age > p2.m_Age;
    }
};
void printSet(const set<Person, MyCompare> &s)
{
    for (set<Person, MyCompare>::const_iterator it = s.begin(); it != s.end(); it++)
        cout << "name: " << it->m_Name << ", age: " << it->m_Age << endl;
    cout << endl;
}
void test01()
{
    set<Person, MyCompare> s;
    Person p1("ming", 18);
    Person p2("xing", 19);
    Person p3("hong", 20);
    Person p4("wang", 21);
    s.insert(p1);
    s.insert(p2);
    s.insert(p3);
    s.insert(p4);
    printSet(s);
}
int main()
{
    test01();
    return 0;
}
```

### 3.9 map/multimap容器

#### 3.9.1 map基本概念

+ 简介
    1. map中所有元素都是pair
    2. pair中第一个元素为key, 起到索引作用, 第二个元素为value
    3. 所有元素都会根据元素的键值自动排序
+ 本质
    1. map/mutimap属于关联式容器, 底层是用二叉树实现
+ 优点:
    1. 可以根据key值快速查找value
+ map和multimap区别
    1. map不允许容器中有重复key
    2. multimap允许容器中有重复key

#### 3.9.2 map构造和赋值

+ 函数原型
    1. map<T1, T2> m; // 默认构造函数
    2. map(const map &m); // 拷贝构造函数
    3. map& operator=(const map &m); // 重载等号操作符

```shell
#include <iostream>
using namespace std;
#include <map>

// map构造和赋值
void printMap(const map<int, int> &m)
{
    for (map<int, int>::const_iterator it = m.begin(); it != m.end(); it++)
    {
        cout << "key = " << it->first << " value = " << it->second << endl;
    }
    cout << endl;
}
void test01()
{
    map<int, int> m1;
    // m1[0] = 10;
    // m1[2] = 20;
    // m1[1] = 30;
    m1.insert(make_pair(0, 10));
    m1.insert(make_pair(3, 20));
    m1.insert(make_pair(1, 30));
    m1.insert(make_pair(2, 30));
    printMap(m1);
    // 拷贝构造
    map<int, int> m2(m1);
    printMap(m2);
    // 赋值
    map<int, int> m3;
    m3 = m2;
    printMap(m3);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.9.3 map大小和交换

+ 函数原型
    1. size(); // 返回容器中元素的数目
    2. empty(); // 判断容器是否为空
    3. swap(m); // 将m与本身的元素互换

```shell
#include <iostream>
using namespace std;
#include <map>

// map大小和交换
void printMap(const map<int, int> &m)
{
    for (map<int, int>::const_iterator it = m.begin(); it != m.end(); it++)
    {
        cout << "key = " << it->first << " value = " << it->second << endl;
    }
    cout << endl;
}
void test01()
{
    map<int, int> m1;
    m1[0] = 10;
    m1[1] = 20;
    m1[2] = 30;
    printMap(m1);
    if (m1.empty())
        cout << "m1为空" << endl;
    else
        cout << "m1不为空" << endl;
    cout << "m1的大小为: " << m1.size() << endl;
    map<int, int> m2;
    m2[0] = -1;
    m2[1] = -1;
    m2[2] = -1;
    cout << "交换前" << endl;
    printMap(m1);
    m2.swap(m1);
    cout << "交换后" << endl;
    printMap(m1);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.9.4 map插入和删除

+ 函数原型
    1. insert(elem); // 向map容器中添加元素
    2. clear(); // 清空map容器
    3. erase(pos); // 删除pos迭代器所指的元素，返回下一个元素的迭代器
    4. erase(beg, end); // 删除区间[beg, end)的所有元素
    5. erase(key); // 删除key键对应的元素

```shell
#include <iostream>
using namespace std;
#include <map>

// map插入和删除
void printMap(const map<int, int> &m)
{
    for (map<int, int>::const_iterator it = m.begin(); it != m.end(); it++)
        cout << "key = " << it->first << " value = " << it->second << endl;
    cout << endl;
}
void test01()
{
    map<int, int> m1;
    // 插入
    m1.insert(pair<int, int>(1, 10));
    m1.insert(make_pair(2, 20));
    m1.insert(map<int, int>::value_type(3, 30));
    m1[4] = 40; // 不建议插入, 用途: 可以利用key访问到value
    printMap(m1);
    // 删除
    m1.erase(m1.begin());
    printMap(m1);
    m1.erase(2); // 删除key为2的元素
    printMap(m1);
    m1.erase(m1.begin(), m1.end()); // 相当于清空
    printMap(m1);
    m1.clear(); // 清空
    printMap(m1);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.9.5 map查找和统计

+ 函数原型
    1. find(key);  // 查找key是否存在, 如果存在, 返回该键的元素的迭代器, 否则返回map.end()
    2. count(key); // 查找key的个数, 如果key存在, 返回1, 否则返回0

```shell
#include <iostream>
using namespace std;
#include <map>

// map查找和统计
void printMap(const map<int, int> &m)
{
    for (map<int, int>::const_iterator it = m.begin(); it != m.end(); it++)
        cout << "key = " << it->first << " value = " << it->second << endl;
    cout << endl;
}
void test01()
{
    map<int, int> m1;
    // 查找
    m1.insert(make_pair(1, 10));
    m1.insert(make_pair(2, 10));
    m1.insert(make_pair(3, 10));
    map<int, int>::iterator pos = m1.find(2);
    if (pos != m1.end())
        cout << "key = " << pos->first << " value = " << pos->second << endl;
    else
        cout << "没有找到" << endl;
    // 统计
    int num = m1.count(2);
    cout << "num = " << num << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 3.9.6 map容器排序

+ 函数原型
    1. sort(beg, end, cmp); // 将[beg, end)区间内的元素进行排序，使用cmp作为排序规则
    2. sort(beg, end); // 将[beg, end)区间内的元素进行排序，使用仿函数
    3. cmp(a, b); // 返回true, 则a排前面, 否则b排前面
    4. cmp(a, b) { return a > b; } // 降序
    5. cmp(a, b) { return a < b; } // 升序

```shell
#include <iostream>
using namespace std;
#include <map>

// map容器排序
class MyCompare
{
public:
    bool operator()(int v1, int v2) const
    {
        return v1 > v2;
    }
};
void printMap(const map<int, int, MyCompare> &m)
{
    for (map<int, int, MyCompare>::const_iterator it = m.begin(); it != m.end(); it++)
        cout << "key = " << it->first << " value = " << it->second << endl;
    cout << endl;
}
void test01()
{
    map<int, int, MyCompare> m1;
    m1.insert(make_pair(1, 10));
    m1.insert(make_pair(3, 30));
    m1.insert(make_pair(2, 20));
    printMap(m1);
}
int main()
{
    test01();
    return 0;
}
```

#### 3.9.7 map自定义数据类型排序

+ map只能根据key进行排序，如果key相同，则根据value进行排序

```shell
#include <iostream>
using namespace std;
#include <map>

// map自定义数据类型排序
class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    string m_Name;
    int m_Age;
};
class MyCompare
{
public:
    bool operator()(const Person &p1, const Person &p2) const
    {
        return p1.m_Age > p2.m_Age;
    }
};
void printMap(const map<Person, int, MyCompare> &m)
{
    for (map<Person, int, MyCompare>::const_iterator it = m.begin(); it != m.end(); it++)
        cout << "value = " << it->second << ", name = " << it->first.m_Name << ", age = " << it->first.m_Age << endl;
    cout << endl;
}
void test01()
{
    map<Person, int, MyCompare> m1;
    Person p1("ming", 19);
    Person p2("xing", 18);
    Person p3("wang", 20);
    m1.insert(make_pair(p1, 1));
    m1.insert(make_pair(p2, 2));
    m1.insert(make_pair(p3, 3));
    printMap(m1);
}
int main()
{
    test01();
    return 0;
}
```

### 3.10 案例-员工分组

```shell
#include <iostream>
using namespace std;
#include <string>
#include <vector>
#include <map>
#include <ctime>
#define CEHUA 0
#define MEISHU 1
#define YANFA 2
class Worker
{
public:
    string m_Name;
    int m_Salary;
};

void createWorker(vector<Worker> &v)
{
    string nameSeed = "ABCDEFGHIJ";
    for (int i = 0; i < 10; i++)
    {
        Worker w;
        w.m_Name = "员工";
        w.m_Name += nameSeed[i];
        w.m_Salary = rand() % 10000 + 10000;
        v.push_back(w);
    }
}
void setGruop(vector<Worker> &v, multimap<int, Worker> &m)
{
    for (vector<Worker>::iterator it = v.begin(); it != v.end(); it++)
    {
        int deptId = rand() % 3;
        m.insert(make_pair(deptId, *it));
    }
}
void showWorkerByGroup(multimap<int, Worker> &m)
{
    cout << "-------------------------------------------------" << endl;
    multimap<int, Worker>::iterator pos = m.find(CEHUA);
    map<int, string> mDept = {
        {CEHUA, "策划"},
        {MEISHU, "美术"},
        {YANFA, "研发"}};
    for (int i = 0; i < 3; i++)
    {
        int count = m.count(i);
        int index = 0;
        cout << "部门编号：" << mDept[i] << endl;
        for (; pos != m.end() && index < count; pos++, index++)
        {
            cout << "name: " << pos->second.m_Name << " salary: " << pos->second.m_Salary << endl;
        }
    }
}
int main()
{
    srand((unsigned int)time(NULL));
    // 1. 创建员工
    vector<Worker> vWorker;
    createWorker(vWorker);
    for (vector<Worker>::iterator it = vWorker.begin(); it != vWorker.end(); it++)
        cout << "name: " << it->m_Name << " salary: " << it->m_Salary << endl;
    // 2. 员工分组
    multimap<int, Worker> mWorker;
    setGruop(vWorker, mWorker);
    // 3. 分组显示员工
    showWorkerByGroup(mWorker);
    return 0;
}
```

## 4. STL函数对象

### 4.1 函数对象

#### 4.1.1 函数对象概念

+ 概念
    1. 重载函数调用操作符的类, 其对象常称为函数对象
    2. 函数对象使用重载的()时, 行为类似d函数调用, 也叫反函数
+ 本质
    1. 函数对象(仿函数)式一个类, 不是一个函数

#### 4.1.2 函数对象使用

+ 特点
    1. 函数对象在使用时, 可以像普通函数那样调用, 可以有参数, 也可以有返回值
    2. 函数对象超出普通函数的概念, 函数对象可以有自己的状态
    3. 函数对象可以作为参数传递

```shell
#include <iostream>
using namespace std;

// 函数对象使用
class MyAdd
{
public:
    int operator()(int a, int b)
    {
        return a + b;
    }
};
// 1. 函数对象在使用时, 可以像普通函数那样调用, 可以有参数, 也可以有返回值
void test01()
{
    MyAdd myadd;
    cout << myadd(10, 20) << endl;
}
// 2. 函数对象超出普通函数的概念, 函数对象可以有自己的状态
class Myprint
{
public:
    Myprint()
    {
        this->count = 0;
    }
    void operator()(string test)
    {
        cout << test << endl;
        this->count++;
    }
    int count = 0;
};
void test02()
{
    Myprint myprint;
    myprint("hello world");
    myprint("hello world");
    myprint("hello world");
    cout << "myprint调用的次数为: " << myprint.count << endl;
}
// 3. 函数对象可以作为参数传递
void doPrint(Myprint &myprint, string test)
{
    myprint(test);
}
void test03()
{
    Myprint myprint;
    doPrint(myprint, "hello world");
}
int main()
{
    test01();
    test02();
    test03();
    return 0;
}
```

### 4.2 谓词

#### 4.2.1 谓词概念

+ 概念
    1. 返回bool类型的仿函数称为谓词
    2. 如果operator()接收一个参数, 则称为一元谓词
    3. 如果operator()接收两个参数, 则称为二元谓词

#### 4.2.2 一元谓词

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 返回bool类型的仿函数称为谓词
// 一元谓词
class GreaterFive
{
public:
    bool operator()(int val)
    {
        return val > 5;
    }
};
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
    {
        v.push_back(i);
    }
    // 查找容器中有没有大于5的数字
    find_if(v.begin(), v.end(), GreaterFive());
    vector<int>::iterator it = find_if(v.begin(), v.end(), GreaterFive());
    if (it == v.end())
        cout << "未到了" << endl;
    else
        cout << "没找到了大于5的数: " << *it << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 4.2.2 二元谓词

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 返回bool类型的仿函数称为谓词
// 二元谓词
class MyCompare
{
public:
    bool operator()(int v1, int v2)
    {
        return v1 > v2;
    }
};
void printVector(const vector<int> &v)
{
    for (vector<int>::const_iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v;
    v.push_back(10);
    v.push_back(40);
    v.push_back(20);
    v.push_back(30);
    v.push_back(50);
    printVector(v);
    // 使用函数对象改变算法策略, 变为排序规则为从大到小
    // sort(v.begin(), v.end(), greater<int>());
    sort(v.begin(), v.end(), MyCompare());
    printVector(v);
}
int main()
{
    test01();
    return 0;
}
```

### 4.3 内建函数对象

#### 4.3.1 内建函数对象意义

+ 概念
    1. STL内建类一些函数对象
+ 分类
    1. 算术仿函数
    2. 关系仿函数
    3. 逻辑仿函数
+ 用法
    1. 这些仿函数所产生的对象, 用法和一般函数完全相同
    2. 使用内建函数对象, 需要引入头文件#include 《functional》

##### 4.3.2 算术仿函数

+ 功能描述
    1. 实现四则运算
    2. 其中negate是一元运算, 其他都是二元运算
+ 仿函数原型
    1. template《class T》 T plus《T》 // 加法仿函数
    2. template《class T》 T minus《T》 // 减法仿函数
    3. template《class T》 T multiplies《T》 // 乘法仿函数
    4. template《class T》 T divides《T》 // 除法仿函数
    5. template《class T》 T modulus《T》 // 取模仿函数
    6. template《class T》 T negate《T》 // 取反仿函数

```shell
#include <iostream>
using namespace std;
#include <functional>

// 内建函数对象
// negate一元仿函数 取反仿函数

void test01()
{
    negate<int> n;
    cout << n(10) << endl;
}
// plus f二元仿函数 加法
void test02()
{
    plus<int> p;
    minus<int> m;
    multiplies<int> multi;
    divides<int> d;
    cout << p(10, 20) << endl;
    cout << m(10, 20) << endl;
    cout << multi(10, 20) << endl;
    cout << d(20, 10) << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 4.3.3 关系仿函数

+ 功能
    1. 实现关系对比
+ 仿函数原型
    1. template《class T》 bool equal_to《T》 // 等于
    2. template《class T》 bool not_equal《T》 // 不等于
    3. template《class T》 bool greater《T》 // 大于
    4. template《class T》 bool greater_equal《T》 // 大于等于
    5. template《class T》 bool less《T》 // 小于
    6. template《class T》 bool less_equal《T》 // 小于等于

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <functional>

// 关系仿函数
// 大于 greater
void printVector(const vector<int> &v)
{
    for (vector<int>::const_iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v;
    v.push_back(10);
    v.push_back(30);
    v.push_back(40);
    v.push_back(20);
    v.push_back(50);
    sort(v.begin(), v.end(), greater<int>());
    printVector(v);
}
int main()
{
    test01();
    return 0;
}
```

#### 4.3.4 逻辑仿函数

+ 功能
    1. 实现逻辑运算
+ 函数原型
    1. template《class T》 bool logical_and《T》 // 逻辑与
    2. template《class T》 bool logical_or《T》 // 逻辑或
    3. template《class T》 bool logical_not《T》 // 逻辑非

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <functional>

// 逻辑仿函数
// 逻辑非 logic_not
void printVector(vector<bool> &v)
{
    for (vector<bool>::iterator it = v.begin(); it != v.end(); it++)
    {
        cout << *it << " ";
    }
    cout << endl;
}
void test01()
{
    vector<bool> v;
    v.push_back(true);
    v.push_back(false);
    v.push_back(true);
    v.push_back(false);
    printVector(v);
    // 利用逻辑非将容器中的值取反
    vector<bool> v2;
    v2.resize(v.size());
    transform(v.begin(), v.end(), v2.begin(), logical_not<bool>());
    printVector(v2);
}
int main()
{
    test01();
    return 0;
}
```

## 5. STL常用算法

### 5.1 常用遍历算法

+ for_each // 遍历容器元素
+ transform // 搬运容器元素

#### 5.1.1 for_each

+ for_each(iterator beg, iterator end,_Func )
    1. 遍历容器元素
    2. beg 开始迭代器
    3. end 结束迭代器
    4. _Func 函数或者函数对象

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用遍历算法for_each
// 普通函数
void print01(int val)
{
    cout << val << " ";
}
// 仿函数
class print02
{
public:
    void operator()(int val)
    {
        cout << val << " ";
    }
};
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    for_each(v.begin(), v.end(), print01);
    cout << endl;
    for_each(v.begin(), v.end(), print02());
    cout << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 5.1.2 transform

+ 功能描述
    1. 搬运容器到另一个容器中
+ transform(iterator beg1, iterator end1, iterator beg2, _Func)
    1. beg1 源容器开始迭代器
    2. end1 源容器结束迭代器
    3. beg2 目标容器开始迭代器
    4. _Func 函数或者函数对象

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用遍历算法transform
class myprint
{
public:
    void operator()(int val)
    {
        cout << val << " ";
    }
};
class mytransform
{
public:
    int operator()(int val)
    {
        return val + 100;
    }
};
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    vector<int> v2(v.size());
    for_each(v.begin(), v.end(), myprint());
    cout << endl;
    transform(v.begin(), v.end(), v2.begin(), mytransform());
    for_each(v2.begin(), v2.end(), myprint());
    cout << endl;
}
int main()
{
    test01();
    return 0;
}
```

### 5.2 常用查找算法

+ 算法简介
    1. find // 查找元素
    2. find_if // 查找满足条件的元素
    3. adjacent_find // 查找相邻重复元素
    4. binary_search // 查找元素，使用二分查找法
    5. count // 统计元素个数
    6. count_if // 统计满足条件的元素个数

#### 5.2.1 find

+ 功能描述
    1. 查找容器中指定元素, 找到返回该元素的迭代器，找不到返回结束迭代器
+ find(iterator beg, iterator end, value);
    1. 按值查找元素, 找到返回该元素的迭代器，找不到返回结束迭代器
    2. beg 开始迭代器
    3. end 结束迭代器
    4. value 查找的元素值

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用查找算法find
// 查找内置数据类型
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    // 查找容器中是否有5这个元素
    vector<int>::iterator it = find(v.begin(), v.end(), 5);
    if (it == v.end())
        cout << "没有找到" << endl;
    else
        cout << "找到5,位置是:" << it - v.begin() << endl;
}
// 查找自定义数据类型
class Person
{
public:
    string m_Name;
    int m_Age;
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    // 重载==, 让底层find可以比较自定义数据类型
    bool operator==(const Person &p)
    {
        if (this->m_Name == p.m_Name && this->m_Age == p.m_Age)
            return true;
        else
            return false;
    }
};
void test02()
{
    vector<Person> v;
    Person p1("ming", 19);
    Person p2("xing", 18);
    Person p3("wang", 20);
    v.push_back(p1);
    v.push_back(p2);
    v.push_back(p3);
    // 查找容器中是否有唐僧这个元素
    vector<Person>::iterator it = find(v.begin(), v.end(), p2);
    if (it == v.end())
        cout << "没有找到" << endl;
    else
        cout << "找到唐僧,位置是:" << it - v.begin() << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 5.2.2 find_if

+ 功能描述
    1. 按条件查找元素, 找到返回该元素的迭代器，找不到返回结束迭代器
+ find_if(iterator beg, iterator end,_Pred);
    1. 按值查找元素, 找到返回该元素的迭代器，找不到返回结束迭代器
    2. beg 开始迭代器
    3. end 结束迭代器
    4. _Pred 函数或者函数对象

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用查找算法find_if
// 查找内置数据类型
class GreaterFive
{
public:
    bool operator()(int v)
    {
        return v > 5;
    }
};
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    // 查找容器中是否有5这个元素
    vector<int>::iterator it = find_if(v.begin(), v.end(), GreaterFive());
    if (it == v.end())
        cout << "没有找到" << endl;
    else
        cout << "找到5,位置是:" << it - v.begin() << endl;
}
// 查找自定义数据类型
class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    string m_Name;
    int m_Age;
    bool operator==(const Person &p)
    {
        if (this->m_Name == p.m_Name && this->m_Age == p.m_Age)
            return true;
        else
            return false;
    }
};
class GreaterPerson
{
public:
    bool operator()(const Person &p)
    {
        return p.m_Age > 19;
    }
};
void test02()
{
    vector<Person> v;
    Person p1("ming", 19);
    Person p2("xing", 18);
    Person p3("wang", 20);
    v.push_back(p1);
    v.push_back(p2);
    v.push_back(p3);
    vector<Person>::iterator it = find_if(v.begin(), v.end(), GreaterPerson());
    if (it == v.end())
        cout << "没有找到" << endl;
    else
        cout << "找到了位置是:" << it - v.begin() << " "
             << "姓名: " << it->m_Name << " "
             << "年龄: " << it->m_Age << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 5.2.3 adjacent_find

+ 功能描述
    1. 查找相邻重复元素, 找到返回该元素的迭代器，找不到返回结束迭代器
+ adjacent_find(iterator beg, iterator end);
    1. 查找相邻重复元素, 返回相邻元素的第一个位置的迭代器
    2. beg 开始迭代器
    3. end 结束迭代器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用查找算法adjacent_find
void test01()
{
    vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(10);
    v.push_back(10);
    v.push_back(30);
    v.push_back(10);
    v.push_back(40);
    vector<int>::iterator pos = adjacent_find(v.begin(), v.end());
    if (pos == v.end())
    {
        cout << "没有找到" << endl;
    }
    else
    {
        cout << "找到相邻重复的元素：" << *pos << endl;
    }
}
int main()
{
    test01();
    return 0;
}
```

#### 5.2.4 binary_search

+ 功能描述
    1. 查找指定元素是否存在
+ binary_search(iterator beg, iterator end, value);
    1. 查找指定的元素, 查到返回true, 找不到返回false
    2. 注意: 在无序序列中不可用
    3. beg 开始迭代器
    4. end 结束迭代器
    5. value 查找的元素值

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用查找算法binary_search
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    sort(v.begin(), v.end()); // 注意: 排序之后才能使用二分查找
    bool ret = binary_search(v.begin(), v.end(), 10);
    if (ret)
    {
        cout << "找到了" << endl;
    }
    else
    {
        cout << "没找到" << endl;
    }
}
int main()
{
    test01();
    return 0;
}
```

#### 5.2.5 count

+ 功能描述
    1. 统计元素个数
+ count(iterator beg, iterator end, value);
    1. 统计指定元素个数
    2. beg 开始迭代器
    3. end 结束迭代器
    4. value 查找的元素值

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <string>
#include <algorithm>

// 常用查找算法count
// 1. 统计内置数据类型
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    int num = count(v.begin(), v.end(), 5);
    cout << "num = " << num << endl;
}
// 2. 统计自定义数据类型
class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    bool operator==(const Person &p)
    {
        if (this->m_Name == p.m_Name && this->m_Age == p.m_Age)
            return true;
        else
            return false;
    }
    string m_Name;
    int m_Age;
};
void test02()
{
    vector<Person> v;
    Person p1("ming", 19);
    Person p2("xing", 28);
    Person p3("wang", 20);
    Person p4("wang", 20);
    v.push_back(p1);
    v.push_back(p2);
    v.push_back(p3);
    v.push_back(p4);
    int num = count(v.begin(), v.end(), p3);
    cout << "num = " << num << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

#### 5.2.6 count_if

+ 功能描述
    1. 按条件统计元素个数
+ count_if(iterator beg, iterator end,_Pred);
    1. 按条件统计元素个数
    2. beg 开始迭代器
    3. end 结束迭代器
    4. _Pred 函数或者函数对象

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <string>
#include <algorithm>

// 常用查找算法count_if
// 1. 统计内置数据类型
class GreaterFive
{
public:
    bool operator()(int val)
    {
        return val > 5;
    }
};
void test01()
{
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    int num = count_if(v.begin(), v.end(), GreaterFive());
    cout << "num = " << num << endl;
}
// 2. 统计自定义数据类型
class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    }
    string m_Name;
    int m_Age;
};
class GreaterPerson
{
public:
    bool operator()(const Person &p1)
    {
        return p1.m_Age > 18;
    }
};
void test02()
{
    vector<Person> v;
    Person p1("ming", 19);
    Person p2("xing", 18);
    Person p3("wang", 20);
    Person p4("wang", 20);
    v.push_back(p1);
    v.push_back(p2);
    v.push_back(p3);
    v.push_back(p4);
    int num = count_if(v.begin(), v.end(), GreaterPerson());
    cout << "num = " << num << endl;
}
int main()
{
    test01();
    test02();
    return 0;
}
```

### 5.3 常用排序算法

+ 算法简介
    1. sort // 对容器内元素进行排序
    2. random_shuffle // 随机打乱容器内元素
    3. merge // 合并两个有序容器
    4. reverse // 翻转容器内元素

#### 5.3.1 sort

+ 功能描述
    1. 对容器内元素进行排序
+ sort(iterator beg, iterator end, _Pred);
    1. 按值查找元素, 找到返回该元素的迭代器，找不到返回结束迭代器
    2. beg 开始迭代器
    3. end 结束迭代器
    4. _Pred 谓词

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用排序算法sort
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v;
    for (int i = 0; i < 5; i++)
    {
        v.push_back(i - 2);
        v.push_back(i + 2);
    }
    printVector(v);
    sort(v.begin(), v.end()); // 默认升序
    printVector(v);
    sort(v.begin(), v.end(), greater<int>()); // 降序
    printVector(v);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.3.2 random_shuffle

+ 功能描述
    1. 随机打乱容器内元素
+ random_shuffle(iterator beg, iterator end);
    1. 指定范围内的元素随机调整次序
    2. beg 开始迭代器
    3. end 结束迭代器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <ctime>

// 常用排序算法random_shuffle
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    srand(time(NULL));
    vector<int> v;
    for (int i = 0; i < 10; i++)
        v.push_back(i);
    printVector(v);
    // 打乱顺序
    random_shuffle(v.begin(), v.end());
    printVector(v);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.3.3 merge

+ 功能描述
    1. 合并两个有序容器
+ merge(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
    1. 将两个有序容器合并到第三个容器
    2. beg1 开始迭代器
    3. end1 结束迭代器
    4. beg2 开始迭代器
    5. end2 结束迭代器
    6. dest 目标容器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用排序算法merge
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    srand(time(NULL));
    vector<int> v1;
    vector<int> v2;
    for (int i = 0; i < 5; i++)
    {
        v1.push_back(i);
        v2.push_back(i + 2);
    }
    printVector(v1);
    printVector(v2);
    // 目标容器需要提前开辟空间
    vector<int> v3(v1.size() + v2.size());
    // 合并需要两个有序序列
    merge(v1.begin(), v1.end(), v2.begin(), v2.end(), v3.begin());
    printVector(v3);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.3.4 reverse

+ 功能描述
    1. 翻转容器内元素
+ reverse(iterator beg, iterator end);
    1. 指定范围内的元素反转
    2. beg 开始迭代器
    3. end 结束迭代器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用排序算法reverse
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    srand(time(NULL));
    vector<int> v1;
    for (int i = 0; i < 10; i++)
        v1.push_back(i);
    cout << "反转前: " << endl;
    printVector(v1);
    cout << "反转后: " << endl;
    reverse(v1.begin(), v1.end());
    printVector(v1);
}
int main()
{
    test01();
    return 0;
}
```

### 5.4 常用拷贝和替换算法

+ 算法简介
    1. copy // 容器内指定的元素拷贝到另一容器中
    2. replace // 将容器内指定范围的旧元素修改为新元素
    3. replace_if // 容器内指定范围满足条件的元素替换为新元素
    4. swap // 互换两个容器的元素

#### 5.4.1 copy

+ 功能描述
    1. 容器内指定范围的元素拷贝到另一容器中
+ copy(iterator beg1, iterator end1, iterator beg2);
    1. 按指查找元素, 找到返回该元素的迭代器，找不到返回结束迭代器
    2. beg1 开始迭代器
    3. end1 结束迭代器
    4. dest目标起始迭代器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用拷贝和替换copy
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
        v1.push_back(i);
    printVector(v1);
    vector<int> v2(v1.size());
    copy(v1.begin(), v1.end(), v2.begin());
    printVector(v2);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.4.2 replace

+ 功能描述
    1. 将容器内指定范围的旧元素修改为新元素
+ replace(iterator beg, iterator end, oldvalue, newvalue);
    1. 将区间内旧元素替换成新元素

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用拷贝和替换replace
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
        v1.push_back(i);
    cout << "替换前: " << endl;
    printVector(v1);
    cout << "替换后: " << endl;
    replace(v1.begin(), v1.end(), 9, 100);
    printVector(v1);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.4.3 replace_if

+ 功能描述
    1. 将区间内满足条件的元素替换成新元素
+ replace_if(iterator beg, iterator end,_Pred, newvalue);
    1. 将区间内满足条件的元素替换成新元素
    2. beg 开始迭代器
    3. end 结束迭代器
    4. _Pred 谓词，条件判断
    5. newvalue 新元素

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用拷贝和替换replace_if
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
bool MyCompare(int &v1)
{
    return v1 > 5;
}
class pred_compare
{
public:
    bool operator()(int &v1)
    {
        return v1 > 5;
    }
};
void test01()
{
    vector<int> v1;
    for (int i = 0; i < 10; i++)
        v1.push_back(i);
    cout << "替换前: " << endl;
    printVector(v1);
    cout << "替换后: " << endl;
    // replace_if(v1.begin(), v1.end(), pred_compare(), 100);
    replace_if(v1.begin(), v1.end(), MyCompare, 100);
    printVector(v1);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.4.4 swap

+ 功能描述
    1. 互换两个容器的元素
+ swap(container c1, container c2);
    1. 互换两个容器的元素
    2. c1 容器1
    3. c2 容器2

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用拷贝和替换swap
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1;
    vector<int> v2;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i + 10);
        v2.push_back(i + 20);
    }
    cout << "交换前: " << endl;
    printVector(v1);
    swap(v1, v2);
    cout << "交换后: " << endl;
    printVector(v1);
}
int main()
{
    test01();
    return 0;
}
```

### 5.5 常用生成算法

+ 算术生成算法属于小型算法, 使用时包含的的头文件为: #include 《numeric》
+ 算法简介
    1. accumulate // 累计求和
    2. fill // 向容器中添加元素

#### 5.5.1 accumulate

+ 功能描述
    1. 计算区间内容器元素的和
+ accumulate(iterator beg, iterator end, value);
    1. 计算容器元素的和
    2. beg 开始迭代器
    3. end 结束迭代器
    4. value 起始值

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <numeric>

// 常用算术生成算法
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1;
    for (int i = 0; i <= 100; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);
    // 参数3: 起始累加值
    int total = accumulate(v1.begin(), v1.end(), 0);
    cout << "total: " << total << endl;
}
int main()
{
    test01();
    return 0;
}
```

#### 5.5.2 fill

+ 功能描述
    1. 向容器中填充指定元素
+ fill(iterator beg, iterator end, value);
    1. 向容器中填充指定元素
    2. beg 开始迭代器
    3. end 结束迭代器
    4. value 填充元素

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <numeric>

// 常用算术生成算法fill
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1(10);
    printVector(v1);
    fill(v1.begin(), v1.end(), 100);
    printVector(v1);
}
int main()
{
    test01();
    return 0;
}
```

### 5.6 常用集合算法

+ 算法简介
    1. set_intersection // 求两个容器的交集
    2. set_union // 求两个容器的并集
    3. set_difference // 求两个容器的差集

#### 5.6.1 set_intersection

+ 功能描述
    1. 求两个容器的交集
+ set_intersection(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
    1. 求两个容器的交集
    2. 注意: 两个容器必须是有序序列
    3. beg1 容器1开始迭代器
    4. end1 容器1结束迭代器
    5. beg2 容器2开始迭代器
    6. end2 容器2结束迭代器
    7. dest 目标容器开始迭代器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用集合算法set_intersection
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1;
    vector<int> v2;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
        v2.push_back(i * i);
    }
    printVector(v1);
    printVector(v2);
    vector<int> vTarget;
    set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(), back_inserter(vTarget));
    printVector(vTarget);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.6.2 set_union

+ 功能描述
    1. 求两个容器的并集
+ set_union(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
    1. 求两个容器的并集
    2. 注意: 两个容器必须是有序序列
    3. beg1 容器1开始迭代器
    4. end1 容器1结束迭代器
    5. beg2 容器2开始迭代器
    6. end2 容器2结束迭代器
    7. dest 目标容器开始迭代器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用集合算法set_union
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1;
    vector<int> v2;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
        v2.push_back(i * i);
    }
    printVector(v1);
    printVector(v2);
    vector<int> vTarget;
    set_union(v1.begin(), v1.end(), v2.begin(), v2.end(), back_inserter(vTarget));
    printVector(vTarget);
}
int main()
{
    test01();
    return 0;
}
```

#### 5.6.3 set_difference

+ 功能描述
    1. 求两个容器的差集
+ set_difference(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);
    1. 求两个容器的差集
    2. 注意: 两个容器必须是有序序列
    3. beg1 容器1开始迭代器
    4. end1 容器1结束迭代器
    5. beg2 容器2开始迭代器
    6. end2 容器2结束迭代器
    7. dest 目标容器开始迭代器

```shell
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

// 常用集合算法set_difference
void printVector(vector<int> &v)
{
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
        cout << *it << " ";
    cout << endl;
}
void test01()
{
    vector<int> v1;
    vector<int> v2;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
        v2.push_back(i * i);
    }
    printVector(v1);
    printVector(v2);
    vector<int> vTarget1;
    vector<int> vTarget2;
    cout << "v1和v2的差集为: " << endl;
    set_difference(v1.begin(), v1.end(), v2.begin(), v2.end(), back_inserter(vTarget1));
    printVector(vTarget1);
    cout << "v1和v2的差集为: " << endl;
    set_difference(v2.begin(), v2.end(), v1.begin(), v1.end(), back_inserter(vTarget2));
    printVector(vTarget2);
}
int main()
{
    test01();
    return 0;
}
```
