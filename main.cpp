#include <iostream>
#include <vector>

class MyClass {
public:
    int size;
    int* data;

    // Конструктор с параметром size
    MyClass(int size) : size(size), data(new int[size]) {
    }

    // Перегрузка оператора =
    MyClass& operator=(const MyClass& other) {
        if (this == &other) {
            return *this; // Проверка на самоприсваивание
        }
        // Копируем размер
        this->size = other.size;

        // Освобождаем старый массив
        delete[] this->data;

        // Выделяем новую память и копируем данные
        this->data = new int[this->size];
        for (int i = 0; i < this->size; i++) {
            this->data[i] = other.data[i];
        }
        return *this;
    }

    // Метод для вывода массива data
    void printData() {
        std::cout << "Data array: ";
        for (int i = 0; i < this->size; i++) {
            std::cout << this->data[i] << " ";
        }
        std::cout << std::endl;
    }

    // Деструктор
    ~MyClass() {
        delete[] data;
    }
};

int main() {
    setlocale(LC_ALL, "ru");

    MyClass obj1(3);
    MyClass obj2(5);
    MyClass obj3(12);

    // Заполнение массивов
    for (int i = 0; i < 3; i++) {
        obj1.data[i] = i + 1;
    }
    for (int i = 0; i < 5; i++) {
        obj2.data[i] = i + 2;
    }
    for (int i = 0; i < 12; i++) {
        obj3.data[i] = i + 3;
    }

    // Вывод массивов
    obj1.printData();
    obj2.printData();
    obj3.printData();

     obj1 = obj2 = obj3;
     obj1.printData();
    return 0;
}
