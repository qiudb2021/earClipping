# earClipping
将简单多边形转换成一组由同样顶点组成的三角形集合
****
[Triangulation by Ear Clipping](https://blog.csdn.net/u012871784/article/details/50418817)
****
## 简单多边形定义：
1. 由一组**有序的n个顶点**(v<sub>0</sub>,v<sub>1</sub>,...,v<sub>n-1</sub>)组成的
2. 相邻顶点之间通过边($v_i$,v<sub>i+1</sub>)(0≤i≤n-2)相连
3. 边(v<sub>n-1</sub>,v<sub>0</sub>)连接起始点
4. 每个顶点被两条边所共享，而边的所有交点都是顶点。
   ![图1](images/1.png)
****
## 判断方法
一个n边形有n条边，每条边只需要和其他的n-3条不相邻边判断是否相交即可。

其时间复杂度O(n<sup>2</sup>)
## 多边形的三角形化（triangulation of the Polygon）
将一个**简单多边形**分解成三角形集合的方法称为多边形三角化。

由n个顶点组成的简单多边形问题可以分解为n-2个三角形。

最简单的分割算法是**耳剪裁（EarClipping）**，算法复杂度O(n<sup>2</sup>)
****
## Ear Clipping
简单多边形的**耳朵**，是指轴连续顶点V<sub>0</sub>V<sub>1</sub>V<sub>2</sub>组成的内部不包含其他任意顶点的三角形。V<sub>0</sub>V<sub>2</sub>之间的连线称之为多边形的对角线，顶点V<sub>1</sub>称之为**耳尖**

一个由四个顶点（或者更多顶点）组成的多边形至少有两个不重叠的耳尖。这个特性提供了一个通过递归来解决三角化分割的方法。针对由n个顶点组成的简单多边形，找到其耳尖，移除唯一耳尖上的顶点，此时剩余顶点组成了一个n-1个顶点的简单多边形。我们重复这个操作后剩余3个顶点。这样会产生一个复杂度为O(n<sup>3</sup>)的算法

耳朵消除可以在O(n<sup>2</sup>)的时间内来完成，

第1步，将多边形使用**双向链表**存储，这样可以快速的移除耳朵。列表的构建复杂度是O(n)。

第2步，遍历顶点寻找耳朵。对于每一个顶点V<sub>i</sub>和围绕该顶点的三角形V<sub>i-1</sub>V<sub>i</sub>V<sub>i+1</sub>测试其它顶点是否在当前，如果有一个顶点在三角形里面，则不是耳朵。只有都不在里面的情况下才算找到一个耳朵。

具体实现的时候我们可以考虑以下因素让这个算法更为高效：当发现有一个点在里面的时候便可以放弃当前测试。一个凹拐角其两边的夹角大于180<sup>o</sup>，而一个凸拐角两边夹角小于180<sup>o</sup>。存储多边形的数据结构使用4个链表，具体使用数组而不是标准的动态需要分配和释放存储器的链表。多边形的顶点存储在一个循环链表中，凹顶点和凸顶点存储在线型链表中，耳尖存储在一个循环链表中。

一旦凸顶点和耳朵的链表构建成功，每次遍历都会移除一个耳朵。假设当前V<sub>i</sub>是个耳朵并且被移除掉，那么边结构的相邻点V<sub>i-1</sub>,V<sub>i+1</sub>则会发生变化，如果相邻点是凸顶点，那么依旧保持凸点，如果相邻点是个耳朵，那么当顶点V<sub>i</sub>被移除后不一定能保持耳朵状态，如果相邻点是个凹点，那么他则有可能变为一个凸点甚至耳朵。因此当移除顶点V<sub>i</sub>后，如果相邻点是凸点，则必须遍历相关顶点，通过遍历查看是否包含其它点来测试它是否是一个耳朵。我们有n个耳朵，每一次更新才会触发一个耳朵检测，每次过程中更新O(<sub>n</sub>)，所以移除进程的复杂度是O(<sub>n</sub><sup>2</sup>)

0. 初始时
    凸顶点集合C={0,1,3,4,6,9};

    凹顶点集合R={2,5,7,8};

    耳朵集合E={3,4,6,9}

1. 当顶点3被移除时，其对应耳朵的三角形T<sub>0</sub>={2,3,4}，图2.1右侧展示了改进后的多边形的效果。相邻点2是个凹点，变化后依旧是凹点，顶点4是耳朵，现在依旧是耳朵。
    
    图中右侧多边形展示了三角形T<sub>0</sub>={2,3,4}被移除后的效果
    ![图2.1](images/2.1.png "图2.1")
    
    凸顶点集合C={0,1,*~~3~~*,4,6,9};

    凹顶点集合R={2,5,7,8};
    
    耳朵集合E={*~~3~~*,4,6,9} // 3已经被移除

    
2. 继续移除顶点4，其对应耳朵的三角形T<sub>1</sub>={2,4,5}
   
   图2.2右侧多边形展示移除三角形T<sub>1</sub>={2,4,5}后的效果
   ![图2.2](images/2.2.png "图2.2")

   相邻顶点2仍旧保持凹点，相邻5之前是凹点，现在变成了凸点，经过测试最终发现它是个耳朵。因此顶点列表最终的变化结果是

   凹顶点集合R={2,*~~5~~*,7,8}

   耳朵集合E={*~~4~~*, **5**,6,9}

3. 继续移除顶点5，此时对应三角形T<sub>2</sub>={2,5,6}。
   图2.3展示了移除三角形T<sub>2</sub>={2,5,6}后的效果
   ![图2.3](images/2.3.png "图2.3") 

   相邻顶点2原来是个凹点，现在变成凸点，顶点7位于三角形T={1,2,6}内，所以2不是耳朵。所以操作完后各顶点列表

   凹顶点集合R={*~~2~~*,7,8}

   耳朵集合E={*~~5~~*,6,9}

4. 继续移除顶点6，此时应对三角形T<sub>3</sub>={2,6,7}
   图2.4展示了移除三角形T<sub>3</sub>={2,6,7}后的效果
   ![图2.4](images/2.4.png "图2.4")

5. 相邻顶点2是一个凸顶点，但是它由一个非耳朵变成了耳朵顶点。相邻顶点7和8依旧是凹顶点，因此凹顶点集合保持不变。结果：
   
   凹顶点集合R={*~~2~~*,7,8}

   耳朵集合E={*~~6~~*,9,**2**}
6. 

