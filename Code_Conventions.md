## DNAnalyzer Code Conventions (Python 3.10)

1. The project is currently written in Python 3.10, with strict compliance to
[PEP-0008](https://peps.python.org/pep-0008/) in terms of formatting, and to
[PEP-0257](https://peps.python.org/pep-0257/) in regards of docstring
formatting, with slight modification for sake of consistency:

The modifications include:

In lists, as well as declaration of variables, there is always indent after
line break:

```python
hello_world: list[str] = [
        "a", "b", "c",
        "d", "e", "f",
        ...,
    ]

# not this one
hello_world: list[str] = [
    "a", "b", "c",
    "d", "e", "f",
    ...,
]

"""However, in process calls, indent is not required"""
hello_from_long_function(
    "arguments", "argument_2", "argument_3"
)
```

Rules to type checking is provided by [PEP-0484](https://peps.python.org/pep-0484/),
and is checked by [`mypy`](https://github.com/python/mypy), which requires
`type-setuptools` and `type-requests`.

2. Be sure to run the unit tests and test your code first before opening pull
requests, the unit test can be invoked with
[`pytest`](https://github.com/pytest-dev/pytest/): `python -m pytest tests/tests.py`.
