---
layout: post
title:  "Python decorators"
date:   2017-03-31 08:16:15 +0100
---

That might be unusal - post is in English and it is about some technical aspects of programming language.

Recently, as I was doing my usual programming for Applause, I've hit a very nasty bug. I've found it myself, but I've also done it myself in the first place. 
You can see what this bug was about here - [heisenbug](https://gist.github.com/jasisz/485589e842bdfa7f4116c2f3591d05a4). It reminded me that python functions are objects, just as any other object.

And it inspired me to write this post, which explains decorators in a - hopefully - simple way, basing just on the fact that functions are objects. Enjoy!


Functions as first-class objects
--------------------------------

In Python functions are first-class objects. It may be something you've already heard, but what does it *really* mean and what consequences it has? This is a quick guide that should make you aware of that concept.

First of all it means you can simply do this:

    def func():
        print('Func!')
    
    a = func
    a()

It may not look really awesome, but if you think about this it means a lot more. It means you can pass a function as a variable whenever you want.

You can pass it to another function as an argument:

    def call_function_n_times(to_call, n):
        for i in range(n):
            to_call()
    
    call_function_n_times(func, 10)

Functions returning functions
-----------------------------

And what is even more interesting is that you can also create a function returning functions:

    def greeting_function_factory(first_name):
        
        def wrapper(last_name):
            return 'Hello {} {}'.format(first_name, last_name)
    
        return wrapper
    
    greet_johns = greeting_function_factory('John')
    print(greet_johns('Doe'))
    print(greet_johns('Big'))


As you can see the inner function has access to the scope of the outer function. It is really useful thing and it got its own name - _closure_, but do not worry with names, because the concept is very simple.

Let combine this idea with the fact that function can be passed as an argument.

    def greeting_helper(func):
    
        def wrapper(first_name, last_name):
            return 'Hello {}!'.format(func(first_name, last_name))
    
        return wrapper
    
    
    def combine_names(first_name, last_name):
        return '{} {}'.format(first_name, last_name)


    greet_combined_names = greeting_helper(combine_names)
    print(greet_combined_names('John', 'Doe'))


Decorators finally!
-------------------

If you've ever heard of *decorators* and maybe (just as I was!) you are a little scared of them, this mind be the way to understand them. Decorators are just functions _wrapping_ other functions, that is all.

`greeting_helper` is a real decorator! We've just written it and even used to create `greet_combined_names` function.
The only thing is that Python provides some syntactic sugar for decorators. You do not have to write:

    def combine_names(first_name, last_name):
        return '{} {}'.format(first_name, last_name)
    
    greet_combined_names = greeting_helper(combine_names)


You can just do:

    @greeting_helper
    def greet_combined_names(first_name, last_name):
        return '{} {}'.format(first_name, last_name)

But let us take a step further. What if we want to make our greeting more customisable, e.g. provide us with a word used to greet.
Knowing what we know I would probably start with something like:

    def greeting_helper_with_word(word, func):
    
        def wrapper(first_name, last_name):
            return '{} {}!'.format(word, func(first_name, last_name))
    
        return wrapper
    
    
    greet_combined_names = greeting_helper_with_word('Ola', combine_names)
    print(greet_combined_names('John', 'Doe'))

But the sad thing is that this would not work with a `@` syntactic sugar for decorators (you can check). This sugar is so simple, that it requires the function to be the one and *only* argument...
Oh, wait! But we can create a function that would take a greeting word and return an actual decorator with the single `func` argument only!.

    def greeting_helper_with_word(word):
    
        def actual_decorator(func):
    
            def wrapper(first_name, last_name):
                return '{} {}!'.format(word, func(first_name, last_name))
    
            return wrapper
    
        return actual_decorator


    ola_decorator = greeting_helper_with_word('Ola')
    
    @ola_decorator
    def greet_combined_names(first_name, last_name):
        return '{} {}'.format(first_name, last_name)


That is it! We've assigned returned function to `ola_decorator`, but we do not really have to and it can be also written in a more compact way:

    @greeting_helper_with_word('Ola')
    def greet_combined_names(first_name, last_name):
        return '{} {}'.format(first_name, last_name)

The last thing is that often we do not know what exact parameters the function might require, but we want to write a decorator that is compatible with any function. Maybe it is even not a simple function, but the method of some class and it just requires `self` as first parameter?
Do not worry, Python regular args and kwargs comes to the rescue!

    def greeting_helper_with_word(word):
    
        def actual_decorator(func):
    
            def wrapper(*args, **kwargs):
                return '{} {}!'.format(word, func(*args, **kwargs))
    
            return wrapper
    
        return actual_decorator

Such a decorator can be finally used to decorate any function or even a class method.


rynsztok danych - kafka
jezioro danych - 